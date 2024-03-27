import { useState } from 'react';

const NavBar = () => {
    // Simulating user authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('User');

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <span className="text-xl">BookStore</span>
            <div>
                {isLoggedIn ? (
                    <>
                        <span>{username}</span>
                        <button
                            className="ml-4 px-4 py-2 bg-blue-700 rounded"
                            onClick={() => setIsLoggedIn(false)}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-700 rounded"
                        onClick={() => {
                            setIsLoggedIn(true);
                            setUsername('UserLogin'); // Simulate a login
                        }}
                    >
                        Login
                    </button>
                )}
                <span className="ml-4 px-4 py-2 bg-blue-700 rounded">Basket</span>
            </div>
        </nav>
    );
};

export default NavBar;
