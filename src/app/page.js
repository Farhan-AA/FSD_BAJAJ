"use client"
import { useState } from 'react';
import axios from 'axios';
import './page.css';

export default function Home() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('/api/bfhl', parsedInput);
            setResponse(res.data);
            setError('');
        } catch (e) {
            setError('Invalid JSON or server error.');
            console.error(e);
        }
    };

    const handleSelectChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    return (
        <div>
            <h1>Enter JSON Input</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"data": ["A", "C", "z"]}'
                rows={4}
                cols={50}
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {response && (
                <div>
                    <h2>Response</h2>
                    <select multiple onChange={handleSelectChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
                    </select>

                    <div>
                        {selectedOptions.includes('alphabets') && (
                            <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <p>Numbers: {JSON.stringify(response.numbers)}</p>
                        )}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <p>Highest lowercase alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
