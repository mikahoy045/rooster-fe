import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simulated API call
        // Replace this with your actual login API call
        const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('username', data.user.username); // Save username in localStorage
            toast.success('Logged in successfully');
            setTimeout(() => router.push('/'), 500); // Delay for toast to be seen
        } else {
            toast.error('Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/fuji.jpg)' }}>
            <form onSubmit={handleLogin} className="p-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-md focus:bg-blue-700 focus:outline-none">Login</button>
                <p className={'mt-2'}>Don&apos;t have an account? <a href='/register'>register here</a> </p>
            </form>
            <ToastContainer />
        </div>
    );
}
