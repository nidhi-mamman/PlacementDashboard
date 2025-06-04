import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../Context/auth.context";

const CreateJob = () => {
    const { Company_URL, Job_URL,fetchJobs} = useAuth();
    const formRef = useRef(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${Company_URL}/FetchCompany`);
                setCompanies(response.data);
            } catch (err) {
                console.error("Error fetching companies:", err);
            }
        };
        fetchCompanies();
    }, [Job_URL]);

    useEffect(() => {
        let timeout;

        if (error) {
            timeout = setTimeout(() => setError(''), 3000);
        } else if (message) {
            timeout = setTimeout(() => setMessage(''), 3000);
        }

        return () => clearTimeout(timeout);
    }, [error, message]);


    const handleJob = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const form = new FormData(formRef.current);
        const formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value.trim();
        }

        if (!formData.title || !formData.description || !formData.branch || !formData.arrivingDate || !formData.roomNumber || !formData.company) {
            setError('Please fill all required fields.');
            return;
        }

        try {
            const response = await axios.post(`${Job_URL}/CreateJob`, formData);
            if (response.status === 200) {
                setMessage('Job created successfully!');
                formRef.current.reset();
                await fetchJobs();
            } else {
                setError('Failed to create job.');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred while creating the job.');
        }
    };

    return (
        <div className="job-form-wrapper">
            <h1>Create New Job</h1>
            <hr />
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form ref={formRef} onSubmit={handleJob}>
                <input type="text" name="title" placeholder='Title*' />
                <textarea name='description' placeholder='Job Description*'></textarea>
                <select name="branch" defaultValue="">
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science and Engineering (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="ME">Mechanical Engineering (ME)</option>
                    <option value="ECE">Electronics and Communication Engineering (ECE)</option>
                    <option value="CE">Civil Engineering (CE)</option>
                </select>
                <input type="date" name="arrivingDate" placeholder="Arriving Date*" />
                <select name="roomNumber" defaultValue="">
                    <option value="">Select Room</option>
                    <option value="Room1">Room 1</option>
                    <option value="Room2">Room 2</option>
                    <option value="Room3">Room 3</option>
                    <option value="Room4">Room 4</option>
                    <option value="Room5">Room 5</option>
                </select>
                <select name="company" defaultValue="">
                    <option value="">-- Select Company --</option>
                    {companies.map((company, index) => (
                        <option key={index} value={company.companyName}>
                            {company.companyName}
                        </option>
                    ))}
                </select>
                <button className='btn' type='submit'>Create Job</button>

            </form>
        </div>
    );
};

export default CreateJob;
