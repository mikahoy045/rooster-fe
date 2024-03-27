import React from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const NavBar = () => {
    const router = useRouter();
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

    const handleLogout = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: localStorage.getItem('username'), password: "123" }), // Assuming password is needed; adjust as necessary
        });

        if (response.ok) {
            localStorage.removeItem('username');
            toast.success('Logged out successfully', {
                onClose: () => router.push('/'),
                autoClose: 3000,
            });
        } else {
            toast.error('Logout failed');
        }
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-500 text-white mb-5">
            <span className="text-xl">Maverick BookStore</span>
            <div>
                {username ? (
                    <>
                        <span className="pr-4">Hello {username}!</span>
                        <button onClick={handleLogout} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
                        <button onClick={() => router.push('/order')} className="ml-4">
                            🛒
                        </button>
                    </>
                ) : (
                    <button onClick={() => router.push('/login')} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                )}
            </div>
            <ToastContainer />
        </nav>
    );
};

export default NavBar;
