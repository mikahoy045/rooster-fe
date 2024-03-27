import { useEffect, useState, useRef, useCallback } from 'react';
import NavBar from '@components/Navbar';
import BookCard from '@components/BookCard';

interface Book {
    book_id: number;
    title: string;
    writer: string;
    cover_image: string;
    points: number;
    tags: string[];
    stock_quantity: number;
}

const Home = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver>();
    const lastBookElementRef = useCallback((node:any) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/books/infinite?page=${page}`, { signal });
                await new Promise(resolve => setTimeout(resolve, 1000));
                const newBooks: Book[] = await res.json();
                if (newBooks.length === 0) {
                    setHasMore(false);
                } else {
                    setBooks(prevBooks => [...prevBooks, ...newBooks]);
                }
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error("Failed to fetch books:", error);
                    setHasMore(false);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();

        return () => {
            abortController.abort();
        };
    }, [page]);

    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {books.map((book, index) => {
                    if (books.length === index + 1) {
                        return <div ref={lastBookElementRef} key={book.book_id}><BookCard book={book} username={username || ""} /></div>;
                    } else {
                        return <BookCard key={`${book.book_id}-${index}`} book={book} username={username || ""} />;
                    }
                })}
            </div>
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default Home;
