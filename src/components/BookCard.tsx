import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

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

    const handleBuyClick = async () => {
        if (!username) {
            router.push('/login');
        } else {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/order/buy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        items: [{ bookId: book.book_id, quantity: 1 }]
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    toast.success(`Order placed successfully! Order ID: ${data.orderId}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || 'Failed to place order');
                }
            } catch (error) {
                // Handle network errors
                console.error("Failed to place order:", error);
                toast.error('Failed to place order due to network error');
            }
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
