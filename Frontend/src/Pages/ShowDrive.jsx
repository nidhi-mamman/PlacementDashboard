import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/style.css'; // Make sure this path is correct
import { useAuth } from '../Context/auth.context';
import Cookies from 'js-cookie';

const ShowDrive = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const { Job_URL } = useAuth();
    const [branch, setBranch] = useState("");

    useEffect(() => {
        const branchFromCookie = Cookies.get("branch");
        if (branchFromCookie) {
            setBranch(branchFromCookie);
        }
    }, []);

    useEffect(() => {
        if (branch) {
            showPlacementDrive(); // Only call API when branch is available
        }
    }, [branch]);

    const showPlacementDrive = async () => {
        try {
            const response = await axios.get(`${Job_URL}/fetchjobs`, { params: { branch } }); // Replace with your API URL
            setJobs(response.data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="placement-drive-container">
            <h1 className="title">Placement Drive</h1>
            {error && <p className="error-message">Error: {error}</p>}
            {jobs.length > 0 ? (
                <div className="job-list">
                    {jobs.map((job, index) => (
                        <div key={index} className="job-item">
                            <h3 className="job-title">{job.title || 'N/A'}</h3>
                            <p><strong>Room No:</strong> {job.roomNumber || 'Not Assigned'}</p>
                            <p><strong>Arrival Date:</strong> {job.arrivingDate || 'Not Assigned'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading jobs...</p>
            )}
        </div>
    );
};

export default ShowDrive;
