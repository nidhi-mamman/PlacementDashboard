import './App.css'
import Navbar from './Components/Navbar/Navbar'
import MyAccount from './Components/MyAccount/MyAccount'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Logout from './Pages/Logout'
import { useAuth } from './Context/auth.context'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard'
import CreateUser from './Pages/CreateUser'
import AdminLayout from './Components/AdminDashboard/AdminLayout'
import CreateCompany from './Pages/CreateCompany'
import ShowCompany from './Pages/ShowCompany'
import JobDetails from './Pages/JobDetails'
import CreateJob from './Pages/CreateJob'
import CreateAlumini from './Pages/CreateAlumini'
import HomePage from './Pages/HomePage'
import StudentLayout from './Components/StudentDashboard/StudentLayout'
import ShowAluminis from './Pages/ShowAluminis'
import ShowNotice from './Pages/ShowNotice'
import NoticeBoard from './Pages/CreateNotice'
import PlacementCalendar from './Components/Calendar/placement.calendar'

function App() {

  const { admin } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentLayout />}>
            <Route index element={<HomePage />} />
            <Route path='signup' element={<MyAccount type='Sign-Up' />} />
            <Route path='signin' element={<MyAccount type='Sign-In' />} />
            <Route path='/showDrive' element={<PlacementCalendar />} />
            <Route path='/showAluminis' element={<ShowAluminis />} />
            <Route path='/showNotice' element={<ShowNotice />} />
          </Route>
          <Route path='/logout' element={<Logout />} />
          <Route path='/admindashboard' element={admin ? <AdminLayout /> : <Navigate to="/" />}>
            <Route index element={<AdminDashboard />} />
            <Route path='createUser' element={<CreateUser />} />
            <Route path='createAlumini' element={<CreateAlumini />} />
            <Route path='createCompany' element={<CreateCompany />} />
            <Route path='createJob' element={<CreateJob />} />
            <Route path='fetchCompany' element={<ShowCompany />} />
            <Route path="fetchDetails/:id" element={<JobDetails />} />
            <Route path="noticeBoard" element={<NoticeBoard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
