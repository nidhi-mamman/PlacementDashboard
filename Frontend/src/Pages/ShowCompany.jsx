import '../CSS/style.css';
import { useAuth } from "../Context/auth.context";
import { Link } from 'react-router-dom'

const ShowCompany = () => {
    const { jobs } = useAuth();
    const getDaysAgo = (dateString) => {
        const postedDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - postedDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Posted today";
        if (diffDays === 1) return "Posted 1 day ago";
        return `Posted ${diffDays} days ago`;
    };

    return (
        <div className="job-listing-container">
            <h1 className="job-listing-header">Available Job Opportunities</h1>

            {jobs.length === 0 ? (
                <div className="no-jobs-message">
                    <p>Currently no jobs available.</p>
                    <p>Please check back later or try refining your search.</p>
                </div>
            ) : (
                <div className="job-grid">
                    {jobs.map((job, index) => (
                        <div key={index} className="job-card">
                            <div className="job-meta">
                                <span className="posted-time">{getDaysAgo(job.postedOn)}</span>
                            </div>
                            <div className="job-card-header">
                                <span className="company-name">{job.company}</span>
                                <span>India</span>
                            </div>
                            <h2 className="job-title">{job.title}</h2>
                            <p className="job-description">{job.description}</p>
                            <div className="job-details">
                                <Link to={`/admindashboard/fetchDetails/${job._id}`}><button className='job-details-button'>Details</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowCompany;