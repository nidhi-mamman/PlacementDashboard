import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/auth.context';
import axios from 'axios'
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#fa8072'];

const BarChartComponent = () => {
    const { Alumini_URL } = useAuth()
    const [alumniChartData, setAlumniChartData] = useState([]);
    useEffect(() => {
        const allBranches = ['CSE', 'IT', 'ME', 'ECE', 'CE', 'EE'];
        const fetchAlumniCountData = async () => {
            try {
                const res = await axios.get(`${Alumini_URL}/FetchAluminiByBranch`);
                const rawData = res.data;

                // Step 1: Convert to map for faster lookup
                const alumniMap = {};
                rawData.forEach(item => {
                    alumniMap[item._id] = item.count;
                });

                // Step 2: Build full data with 0 count for missing branches
                const formattedData = allBranches.map(branch => ({
                    branch,
                    count: alumniMap[branch] || 0
                }));

                setAlumniChartData(formattedData);
            } catch (error) {
                console.error("Error fetching alumni chart data:", error);
            }
        };
        fetchAlumniCountData()
    }, [Alumini_URL]);

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={alumniChartData} barCategoryGap={10} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="branch" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" barSize={30}>
                        {alumniChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
