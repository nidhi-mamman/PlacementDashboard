import '../CSS/style.css'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import { useAuth } from "../Context/auth.context";

const CreateAlumini = () => {
    const { Alumini_URL } = useAuth();
    const formRef = useRef(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let timeout;

        if (error) {
            timeout = setTimeout(() => setError(''), 3000);
        } else if (message) {
            timeout = setTimeout(() => setMessage(''), 3000);
        }

        return () => clearTimeout(timeout);
    }, [error, message]);


    const handleAlumini = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const form = new FormData(formRef.current);
        const formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value.trim();
        }

        if (!formData.Name || !formData.passout || !formData.branch || !formData.tel || !formData.company) {
            setError('Please fill all required fields.');
            return;
        }

        try {
            const response = await axios.post(`${Alumini_URL}/CreateAlumini`, formData);
            if (response.status === 200) {
                setMessage('Alumini created successfully!');
                formRef.current.reset();
            } else {
                setError('Failed to create alumini.');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred while creating the alumini.');
        }
    };
    return (
        <div className="alumini-form-wrapper">
            <h1>Create Alumini</h1>
            <hr />
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form ref={formRef} onSubmit={handleAlumini}>
                <input type="text" name="Name" id="Name" placeholder='Name*' />
                <select name="branch" id="branches" defaultValue="">
                    <option value="">Select Branch</option>
                    <option value="CSE">Computer Science and Engineering(CSE)</option>
                    <option value="IT">Innformation Technology(IT)</option>
                    <option value="ME">Mechanical Engineering(ME)</option>
                    <option value="ECE">Electronics and Communication Engineering(ECE)</option>
                    <option value="CE">Civil Engineering(CE)</option>
                </select>
                <select name="passout" id="passout" defaultValue="">
                    <option value="">Select Passout Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                </select>
                <input type="text" name="company" id="company" placeholder='Company*' />
                <input type="tel" name="tel" id="tel" placeholder='Phone*' />
                <input type="text" name="linkedin" id="linkedin" placeholder='linkedin(optional)' />
                <button className='btn' type='submit'>Create Alumini</button>

            </form>
        </div>
    )
}

export default CreateAlumini