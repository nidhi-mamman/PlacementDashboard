import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../CSS/style.css"
import { useAuth } from "../Context/auth.context";

const ShowNotice = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { Signup_URL } = useAuth();

    const fetchNotices = async () => {
        try {
            const res = await axios.get(`${Signup_URL}/fetchnotice`);
            setNotices(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching notices:', err);
            setError('Failed to fetch notices');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    if (loading) return <p>Loading notices...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="notice-board-wrapper">
            <div className="notice-board-container">
                <h2>Notice Board</h2>
                {notices.length > 0 ? (
                    <ul className="notice-list">
                        {notices.map((notice, index) => (
                            <li className="notice-item" key={index}>{notice.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No notices available.</p>
                )}
            </div>
        </div>
    );
};

export default ShowNotice;
