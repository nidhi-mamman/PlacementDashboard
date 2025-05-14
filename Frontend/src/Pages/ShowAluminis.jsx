import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/auth.context';
import Cookies from 'js-cookie';

const ShowAluminis = () => {
    const [alumniData, setAlumniData] = useState([]);
    const [error, setError] = useState(null);
    const { Alumini_URL } = useAuth();
    const [branch, setBranch] = useState("");

    useEffect(() => {
        const branchFromCookie = Cookies.get("branch");
        if (branchFromCookie) {
            setBranch(branchFromCookie);
        }
    }, []);

    useEffect(() => {
        if (branch) {
            const fetchAlumniData = async () => {
                try {
                    const response = await axios.get(`${Alumini_URL}/FetchAluminiByBranchDetails`, {
                        params: { branch }
                    });
                    console.log(response)
                    setAlumniData(response.data);
                } catch (err) {
                    setError("Error fetching alumni data.");
                    console.error(err);
                }
            };
            fetchAlumniData();
        }
    }, [branch]); // Ensure the effect runs when branch changes

    return (
        <div>
            {error && <p>{error}</p>}
            {alumniData.length > 0 ? (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Branch</th>
                                <th>Tel</th>
                                <th>Company</th>
                                <th>Passout</th>
                                <th>LinkedIn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alumniData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Name}</td>
                                    <td>{item.branch}</td>
                                    <td>{item.tel}</td>
                                    <td>{item.company}</td>
                                    <td>{item.passout}</td>
                                    <td><a href={item.linkedin} target="_blank" rel="noopener noreferrer">{item.linkedin}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No alumni data available.</p>
            )}
        </div>
    );
};

export default ShowAluminis;
