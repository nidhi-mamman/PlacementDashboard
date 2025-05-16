import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useAuth } from '../../Context/auth.context';
import { RiDeleteBinLine } from "react-icons/ri";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import AnalogClock from '../AnalogClock/AnalogClock';
import axios from 'axios';
import { FaLaptopCode, FaMicrochip, FaCogs, FaBroadcastTower, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { users, Job_URL, Signup_URL } = useAuth();
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [branchCounts, setBranchCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false); // state for loading delete action
  const [error, setError] = useState(''); // state for error message


  const rowsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const sortedUsers = () => {
    if (!users) return [];
    const sorted = [...users];
    if (sort === "fname") sorted.sort((a, b) => a.fname.localeCompare(b.fname));
    else if (sort === "email") sorted.sort((a, b) => a.email.localeCompare(b.email));
    else if (sort === "branch") sorted.sort((a, b) => a.branch.localeCompare(b.branch));
    return sorted;
  };

  const paginatedUsers = sortedUsers().slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const pageCount = Math.ceil(sortedUsers().length / rowsPerPage);

  useEffect(() => {
    const fetchBranchCounts = async () => {
      try {
        const response = await axios.get(`${Job_URL}/branch-count`);
        setBranchCounts(response.data);
      } catch (err) {
        console.error('Error fetching branch counts:', err);
      } finally {
        setLoadingCounts(false);
      }
    };

    fetchBranchCounts();
  }, []);

  // Handle the delete action
  const handleDelete = async (userId) => {
    if (loadingDelete) return;
    setLoadingDelete(true);
    try {
      await axios.delete(`${Signup_URL}/deleteUser/${userId}`);
      alert('User deleted successfully');
      setError('');
      navigate(0)
    } catch (err) {
      setError('Error deleting user');
      console.error('Delete error:', err);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="content-section">
      <div className="additional_data">
        <div className="total-jobs">
          <div className="cse">
            <FaLaptopCode size={32} color="#4e73df" />
            <h5>Computer Science</h5>
            <p>{branchCounts.CSE || 0} Jobs</p>
          </div>
          <div className="it">
            <FaMicrochip size={32} color="#1cc88a" />
            <h5>IT</h5>
            <p>{branchCounts.IT || 0} Jobs</p>
          </div>
          <div className="me">
            <FaCogs size={32} color="#36b9cc" />
            <h5>Mechanical</h5>
            <p>{branchCounts.ME || 0} Jobs</p>
          </div>
          <div className="ece">
            <FaBroadcastTower size={32} color="#f6c23e" />
            <h5>Electronics</h5>
            <p>{branchCounts.ECE || 0} Jobs</p>
          </div>
          <div className="ce">
            <FaBuilding size={32} color="#e74a3b" />
            <h5>Civil</h5>
            <p>{branchCounts.CE || 0} Jobs</p>
          </div>
        </div>
        <div className="clock-time">
          <AnalogClock />
        </div>
      </div>

      <div className="data">
        <div className='sortby'>
          <h4 className='mb-2'>SORT BY</h4>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              width: 200,
              height: 40,
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: '#fff',
              '& fieldset': { border: '1px solid #ccc' },
              '&:hover fieldset': { borderColor: '#007bff' },
              '&.Mui-focused fieldset': { borderColor: '#007bff' },
            }}
          >
            <MenuItem value="">-------------Select--------------</MenuItem>
            <MenuItem value="fname">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="tel">Branch</MenuItem>
          </Select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{(page - 1) * rowsPerPage + index + 1}</td>
                    <td>{user.fname}</td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>{user.branch}</td>
                    <td>
                      <RiDeleteBinLine
                        size={24}
                        color='red'
                        onClick={() => handleDelete(user._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
      </div>
    </div>
  );
};

export default AdminDashboard;
