import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './pages/home/HomePage.jsx'
import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignupPage from './pages/auth/Signup/SignupPage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'
import NotificationPage from './pages/notification/NotificationPage.jsx'
import Sidebar from './components/common/Sidebar.jsx'
import RightPanel from './components/common/RightPanel.jsx'

function App() {

 return (
  <>
    <div className='flex max-w-6xl ax-auto'>
      <Sidebar/>
      <Routes>

        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/notifcations" element={<NotificationPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
      <RightPanel/>
    </div>
    
    </>
 )
}

export default App
