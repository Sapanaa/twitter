import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/home/HomePage.jsx'
import LoginPage from './pages/auth/login/LoginPage.jsx'
import SignupPage from './pages/auth/signup/SignupPage.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'
import NotificationPage from './pages/notification/NotificationPage.jsx'
import Sidebar from './components/common/Sidebar.jsx'
import RightPanel from './components/common/RightPanel.jsx'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner.jsx'

function App() {
  const {data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async() => {
    try{
   const res = await fetch('/api/auth/me')
    const data = await res.json();
    if(data.error ) return null;
    if(!res.ok) throw new Error(data.error || "Failed to fetch user");
    console.log("authUser is here", data)
    return data;
    }
    catch (error) {
      console.error(error)
    }
    retry = false
  }

 })

 if(isLoading){
  return (
    <div className='flex justify-center items-center h-screen'>
      <LoadingSpinner size='lg'/>
    </div>
  )
 }


 return (
  <>
    <div className='flex max-w-6xl ax-auto'>
      {authUser &&  <Sidebar/>}
      <Routes>

        <Route path="/" element={authUser ?<HomePage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to="/"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage/>: <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ?<NotificationPage /> :   <Navigate to="/login" />} />
        <Route path="/profile/:username" element={authUser ?<ProfilePage />: <Navigate to="/login" />} />
      </Routes>
      {authUser && <RightPanel/>}
      <Toaster/>
    </div>
    
    </>
 )
}

export default App
