import { GetServerSideProps } from 'next';
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

interface HomeProps {
    books: Book[];
}

const Home = ({ books }: HomeProps) => {
    return (
        <div>
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {books.map(book => (
                    // <BookCard key={book.book_id} book={book} username={userSession?.username} />
                    <BookCard key={book.book_id} book={book} username={""} />
                ))}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_BE_URL}/api/books`);
    const books = await res.json();

    return {
        props: {
            books,
        },
    };
};

export default Home;
