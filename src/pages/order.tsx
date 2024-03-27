import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Book {
    bookId: number;
    title: string;
    writer: string;
    tags: string[];
}

interface Order {
    order_id: number;
    username: string;
    order_date: string;
    status: string;
    books: Book[];
}

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!username) return;
            const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/order/user/${username}`);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                toast.error('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, [username]);

    const cancelOrder = async (orderId: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/order/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({orderId}),
        });

        if (response.ok) {
            toast.success('Order cancelled successfully');
            setOrders(orders.filter(order => order.order_id !== orderId)); // Remove cancelled order from the list
        } else {
            toast.error('Failed to cancel order');
        }
    };

    const payOrder = async (orderId: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/order/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({orderId, username}),
        });

        if (response.ok) {
            toast.success('Payment successful');
            setOrders(orders.filter(order => order.order_id !== orderId));
        } else {
            toast.error('Failed to process payment');
        }
    };

    return (
        <div className="relative min-h-screen bg-cover bg-center"
             style={{backgroundImage: 'url(/images/california.jpg)'}}>
            <div className="p-5">
                <button className={'text-center'} onClick={() => router.push('/')}>Back to Book Selection</button>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.order_id}
                             className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-5 mb-5">
                            <h2 className="text-xl font-bold">Order ID: {order.order_id}</h2>
                            <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                            <p>Status: {order.status}</p>
                            <div>
                                {order.books.map(book => (
                                    <p key={book.bookId}>{book.title} by {book.writer}</p>
                                ))}
                            </div>
                            <button onClick={() => cancelOrder(order.order_id)}
                                    className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Cancel Order
                            </button>
                            <button onClick={() => payOrder(order.order_id)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Payment
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-5 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg">
                        <p className="text-lg text-white font-semibold">NO ORDER</p>
                    </div>
                )}
            </div>
            <ToastContainer/>
        </div>
    );
}
