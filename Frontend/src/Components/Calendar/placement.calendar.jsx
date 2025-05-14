import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore, startOfDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useAuth } from '../../Context/auth.context';
import Cookies from 'js-cookie';
import '../../CSS/style.css'

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const PlacementCalendar = () => {
    const { Job_URL } = useAuth();
    const [selectedDate, setSelectedDate] = useState(null);
    const [jobsOnDate, setJobsOnDate] = useState([]);
    const [events, setEvents] = useState([]);
    const [branch, setBranch] = useState('');

    useEffect(() => {
        const branchFromCookie = Cookies.get("branch");
        if (branchFromCookie) {
            setBranch(branchFromCookie);
        }
    }, []);

    const fetchJobs = async () => {
        if (!branch) return;

        try {
            const res = await axios.get(`${Job_URL}/fetchjobs`);
            const allJobs = res.data;

            const filteredJobs = allJobs.filter(
                (job) => job.branch === branch && job.arrivingDate
            );

            const formattedEvents = filteredJobs.map((job) => {
                const date = new Date(job.arrivingDate);
                return {
                    title: `${job.title} (${job.company})`,
                    start: startOfDay(date),
                    end: startOfDay(date),
                    allDay: true,
                };
            });

            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchJobsForDate = async (date) => {
        if (!branch) return;

        try {
            const res = await axios.get(`${Job_URL}/fetchjobs`);
            const allJobs = res.data;

            // Format dates consistently for comparison
            const selectedDateStr = format(date, 'yyyy-MM-dd');

            const filtered = allJobs.filter((job) => {
                if (!job.arrivingDate) return false;

                const jobDate = new Date(job.arrivingDate);
                const jobDateStr = format(jobDate, 'yyyy-MM-dd');

                return job.branch === branch && jobDateStr === selectedDateStr;
            });

            setJobsOnDate(filtered);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleDateClick = (date) => {
        // Prevent clicking past dates
        if (isBefore(startOfDay(date), startOfDay(new Date()))) {
            alert("You cannot select a past date.");
            return;
        }
        setSelectedDate(date);
        fetchJobsForDate(date);
    };

    useEffect(() => {
        fetchJobs();
    }, [branch]);

    return (
        <div style={{ margin: '20px!important' }}>
            <h2>Placement Calendar - {branch}</h2>
            <div className="calendar-wraper">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
                    onSelectEvent={(event) => handleDateClick(event.start)}
                    style={{
                        height: 500,
                        marginTop: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '10px'
                    }}
                    views={['month']}
                    defaultView="month"
                    popup
                />
            </div>

            {selectedDate && (
                <div className='calendar-job-wrapper'>
                    <h3>
                        Jobs on {format(selectedDate, 'EEEE, MMMM do yyyy')}:
                    </h3>

                    {jobsOnDate.length > 0 ? (
                        <table
                            border="1"
                            cellPadding="10"
                            style={{
                                marginTop: '10px!important',
                                borderCollapse: 'collapse',
                                width: '100%'
                            }}
                        >
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th>Title</th>
                                    <th>Company</th>
                                    <th>Room No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobsOnDate.map((job) => (
                                    <tr key={job._id}>
                                        <td>{job.title}</td>
                                        <td>{job.company}</td>
                                        <td>{job.roomNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ marginTop: '10px' }}>No jobs scheduled on this date.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlacementCalendar;