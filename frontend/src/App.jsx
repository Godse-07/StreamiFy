import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import useThemeStore from "./store/useThemeStore";
import FriendsPage from "./pages/FriendsPage";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div data-theme={theme} className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSideBar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/friends"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSideBar={true}>
              <FriendsPage />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
          )}
        />
        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSideBar={false}>
              <CallPage />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
          )}
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSideBar={false}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
          )}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSideBar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to={"/"} />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
