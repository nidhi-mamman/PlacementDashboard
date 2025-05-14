import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/auth.context";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const { Job_URL } = useAuth()

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`${Job_URL}/fetchjob/${id}`);
                const data = await res.json();
                console.log("Fetched job:", data);

                setJob(data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };

        fetchJob();
    }, [id]);

    if (!job) return <p>Loading...</p>;

    return (
        <div className="job-details-page">
            <h1>{job.title}</h1>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Posted On:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
        </div>
    );
};

export default JobDetails;
