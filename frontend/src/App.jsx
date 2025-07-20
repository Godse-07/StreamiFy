import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import NotificationsPage from './pages/NotificationsPage'
import OnboardingPage from './pages/OnboardingPage'
import { useQuery } from '@tanstack/react-query'
import { exiosInstance } from './lib/axios'


const App = () => {

  const {data: authData, isLoading, error} = useQuery({queryKey: ["authUser"],
    queryFn: async ()=>{
      const res = await exiosInstance.get("/auth/me")
      return res.data
    },
    retry: false,
  })

  const authUser = authData?.user;

  return (
    <div data-theme="night" className='h-screen'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/call' element={authUser ? <CallPage /> : <Navigate to={"/login"} />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
        <Route path='/onboarding' element={authUser ? <OnboardingPage /> : <Navigate to={"/login"} />} />

      </Routes>
    </div>
  )
}

export default App