import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import NotificationsPage from './pages/NotificationsPage'
import OnboardingPage from './pages/OnboardingPage'
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'



const App = () => {

  const { isLoading, authUser } = useAuthUser();

  console.log("Auth User:", authUser);
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Is Onboarded:", isOnboarded);

  if (isLoading) return <PageLoader />

  return (
    <div data-theme="night" className='h-screen'>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
        )} />
        <Route path='/signup' element={!isAuthenticated ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to={"/login"} />} />
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path='/notifications' element={isAuthenticated ? <NotificationsPage /> : <Navigate to={"/login"} />} />
        <Route path='/onboarding' element={isAuthenticated ? <OnboardingPage /> : <Navigate to={"/login"} />} />
      </Routes>
    </div>
  )
}

export default App