import axios from 'axios';
import { useState } from 'react';

function Header() {
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <h1 className="text-2xl font-bold text-center">Word Generator!</h1>
        </nav>
    );
}

function Footer() {
    return (
        <footer className=" text-white p-4 mt-8">
            <p className="text-center text-sm">
                2024 Made by <span className="font-semibold">John Frisbee</span>
            </p>
        </footer>
    );
}

function Body() {
    const [word, setWord] = useState(""); // User-input word
    const [definition, setDefinition] = useState(""); // Fetched definition
    const [error, setError] = useState(''); // Error message

    const fetchData = () => {
        if (!word.trim()) {
            setError('Please enter a word.');
            setDefinition('');
            return;
        }

        axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((res) => {
                const firstDefinition = res.data[0]?.meanings[0]?.definitions[0]?.definition;
                if (firstDefinition) {
                    setDefinition(firstDefinition);
                    setError('');
                } else {
                    setDefinition('No definition found.');
                }
            })
            .catch(() => {
                setError('Error fetching data. Please try again.');
                setDefinition('');
            });
    };

    return (
        <div className="flex flex-col items-center p-6">
            <input
                value={word}
                onChange={(event) => setWord(event.target.value)}
                placeholder="Enter any word here! Ex: Toy"
                className="p-2 border border-gray-300 rounded-md shadow-md w-80 focus:outline-none focus:ring focus:ring-blue-300 mb-4"
            />
            <button
                onClick={fetchData}
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            >
                Enter
            </button>

            {/* Display error message */}
            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}

            {/* Display the word and its definition */}
            {definition && (
                <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md w-96">
                    <h1 className="text-black text-xl font-semibold">Word: {word}</h1>
                    <h2 className="text-black text-lg">Definition: {definition}</h2>
                </div>
            )}
        </div>
    );
}

export { Header, Body, Footer };
