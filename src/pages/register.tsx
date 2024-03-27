import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulated API call
        // Replace this with your actual register API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('username', data.username); // Save username in localStorage
            toast.success('Registered successfully', {
                onClose: () => router.push('/'), // Redirect after the toast is dismissed
                autoClose: 3000, // Adjust based on your preference
            });
        } else {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/fuji.jpg)' }}>
            <form onSubmit={handleRegister} className="p-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required                />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md focus:bg-blue-700 focus:outline-none">Register</button>
                <p className={'mt-2'}>Already have an account? <a href='/login'>login here</a> </p>
            </form>
            <ToastContainer />
        </div>
    );
}

