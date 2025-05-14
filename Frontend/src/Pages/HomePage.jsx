import "../CSS/style.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useAuth } from "../Context/auth.context";
import AnalogClock from './../Components/AnalogClock/AnalogClock';
import AluminiBarChart from '../Components/AluminiBarChart/BarChart'

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
            <div>
                <div className="dashboard-wraper">
                    <div className="active-wrapper">
                        <p className='companies'><span>Active Companies: </span><span>{activeCompanyCount}</span></p>
                        <p className='jobs'><span>Active Jobs:</span> <span>{activeJobCount}</span></p>
                    </div>
                    <div className="analog-wrapper">
                        <AnalogClock />
                    </div>
                </div>

                <div className="chart-wrapper" >
                    {/* Chart Section */}
                    <div style={{ flex: 1 }}>
                        <h3>Alumnis</h3>
                        <AluminiBarChart />
                    </div>

                    {/* Jobs Section */}
                    <div style={{ flex: 1 }}>
                        <h3>Jobs</h3>
                        <div className="job-cards-container">
                            {jobList.length > 0 ? (
                                jobList.map((job) => (
                                    <div key={job._id} className="job-card">
                                        <h4>{job.title}</h4>
                                        <p><strong>Company:</strong> {job.company}</p>
                                        <p><strong>Description:</strong> {job.description}</p>
                                        <p><strong>Posted on:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No jobs available for this branch.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default HomePage;
