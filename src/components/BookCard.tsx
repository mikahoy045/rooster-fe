import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'; // Ensure you have 'react-toastify' installed

interface Book {
    book_id: number;
    title: string;
    writer: string;
    cover_image: string;
    points: number;
    tags: string[];
    stock_quantity: number;
}

const BookCard = ({ book, username }: { book: Book, username: string | null }) => {
    const router = useRouter();

    const handleBuyClick = () => {
        if (!username) {
            // Redirect to login page if not logged in
            router.push('/login');
        } else {
            // Show success toast notification if logged in
            toast.success('Purchase successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md overflow-hidden" style={{ width: '200px', height: '420px' }}>
            <div className="h-60 w-full overflow-hidden">
                <img src={book.cover_image} alt={`Cover of ${book.title}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow bg-white/30 backdrop-blur-lg rounded-lg shadow-lg">
                <div>
                    <h5 className="text-md font-bold tracking-tight text-gray-900 text-center">{book.title}</h5>
                    <p className="text-gray-700 text-center">By {book.writer}</p>
                    <p className="text-gray-700 text-center">Stock: {book.stock_quantity}</p>
                    <p className="text-gray-700 text-center">Price: ${book.points}</p>
                </div>
                <button onClick={handleBuyClick} className="mt-0 inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full">
                    Buy
                </button>
            </div>
        </div>
    );
};

export default BookCard;
