import "../CSS/style.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useAuth } from "../Context/auth.context";

const HomePage = () => {
    const { Company_URL, Job_URL, Alumini_URL } = useAuth();
    const [activeCompanyCount, setActiveCompanyCount] = useState(0);
    const [activeJobCount, setActiveJobCount] = useState(0);
    const [alumniList, setAlumniList] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [branch, setBranch] = useState("");

    useEffect(() => {
        const branchFromCookie = Cookies.get("branch");
        if (branchFromCookie) {
            setBranch(branchFromCookie);
        }
    }, []);

    useEffect(() => {
        const fetchActiveData = async () => {
            try {
                const res = await axios.get(`${Company_URL}/ActiveCompany`);
                setActiveCompanyCount(res.data.activeCompanyCount);
                setActiveJobCount(res.data.activeJobCount);
            } catch (error) {
                console.error("Error fetching active data:", error);
            }
        };

        const fetchBranchData = async () => {
            if (branch) {
                try {
                    // Fetch alumni data based on branch
                    console.log("Fetching alumni for branch:", branch);
                    const alumniRes = await axios.get(`${Alumini_URL}/FetchAlumini`, { params: { branch } });
                    console.log("alumini", alumniRes)
                    setAlumniList(alumniRes.data);

                    // Fetch jobs based on branch
                    const jobsRes = await axios.get(`${Job_URL}/fetchjobs`, { params: { branch } });
                    console.log(jobsRes)
                    setJobList(jobsRes.data);
                } catch (error) {
                    console.error("Error fetching branch-related data:", error);
                }
            }
        };

        fetchActiveData();
        fetchBranchData();
    }, [Company_URL, branch]);

    return (
        <>
            <h2>Dashboard</h2>
            <div className="active-wrapper">
                <p className='companies'>Active Companies: {activeCompanyCount}</p>
                <p className='jobs'>Active Jobs: {activeJobCount}</p>
            </div>

            <h3>Alumni from {branch} Branch</h3>
            <ul>
                {alumniList.length > 0 ? (
                    alumniList.map((alumni) => (
                        <li key={alumni.id}>{alumni.name}</li>
                    ))
                ) : (
                    <p>No alumni found for this branch.</p>
                )}
            </ul>

            <h3>Jobs for {branch} Branch</h3>
            <ul>
                {jobList.length > 0 ? (
                    jobList.map((job) => (
                        <li key={job.id}>{job.title}</li>
                    ))
                ) : (
                    <p>No jobs available for this branch.</p>
                )}
            </ul>
        </>
    );
};

export default HomePage;
