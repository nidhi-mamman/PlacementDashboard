import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/style.css'
import { useAuth } from "../Context/auth.context";

const NoticeBoard = () => {
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { Signup_URL } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await axios.post(`${Signup_URL}/createNotice`, {
                description,
            });

            if (res.status === 200) {
                setMessage(res.data.msg);
                setDescription('');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to create notice.');
        }
    };

    return (
        <div className="notice-board-form">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter notice description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button type="submit" className='btn'>Create Notice</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default NoticeBoard;
