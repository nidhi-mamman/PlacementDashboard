import { useRef, useState, useEffect } from 'react';
import '../CSS/style.css';
import axios from 'axios';
import { useAuth } from "../Context/auth.context";

const CreateCompany = () => {
    const { Company_URL } = useAuth();
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


    const handleCompany = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const form = new FormData(formRef.current);
        const formData = {};
        for (let [key, value] of form.entries()) {
            formData[key] = value.trim();
        }

        // Basic validation
        if (!formData.companyName || !formData.location || !formData.tel || !formData.email || !formData.companyType) {
            setError('Please fill all required fields.');
            return;
        }

        try {
            const response = await axios.post(`${Company_URL}/CreateCompany`, formData);
            if (response.status === 200) {
                setMessage('Company created successfully!');
                formRef.current.reset();
            } else {
                setError('Failed to create company.');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred while creating the company.');
        }
    };

    return (
        <div className="company-form-wrapper">
            <h1>Create New Company</h1>
            <hr />
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form ref={formRef} onSubmit={handleCompany}>
                <input type="text" name="companyName" placeholder='Company Name*' />
                <input type="text" name="location" placeholder='Location*' />
                <input type="tel" name="tel" placeholder='Phone Number*' />
                <input type="email" name="email" placeholder='Email*' />
                <select name="companyType" defaultValue="">
                    <option value="">-- Select Company Type --</option>
                    <option value="Startup">Startup</option>
                    <option value="Product-based Company">Product-based Company</option>
                    <option value="Service-based Company">Service-based Company</option>
                    <option value="MNC">Multinational Corporation (MNC)</option>
                    <option value="IT Consulting Firm">IT Consulting Firm</option>
                    <option value="R&D Organization">Research & Development Organization</option>
                    <option value="Electronics / Embedded Company">Electronics / Embedded Company</option>
                    <option value="Manufacturing Company">Manufacturing Company</option>
                    <option value="Construction / Real Estate Firm">Construction / Real Estate Firm</option>
                    <option value="Digital Marketing Agency">Digital Marketing Agency</option>
                    <option value="HR Consulting Firm">HR Consulting Firm</option>
                    <option value="Recruitment Agency">Recruitment Agency</option>
                    <option value="Government Organization">Government Organization</option>
                </select>
                <input type="text" name="remark" placeholder='Remark (optional)' />
                <button className='btn' type="submit">Create Company</button>

            </form>
        </div>
    );
};

export default CreateCompany;
