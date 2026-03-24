import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserStore } from "./store/useUserStore.js";
import { Toaster } from "react-hot-toast";
import LazyLoading from "./pages/LazyLoading.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const EmailVerification = lazy(() => import("./pages/EmailVerification.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));

const ProtectedRoute = ({ children, user, isCheckingAuth }) => {
  if (isCheckingAuth) return <LazyLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.emailVerified) return <Navigate to="/emailVerification" replace />;
  return children;
};

const RedirectIfAuthenticated = ({ children, user, isCheckingAuth }) => {
  if (isCheckingAuth) return <LazyLoading />;
  if (user && user.emailVerified) return <Navigate to="/" replace />;
  if (user && !user.emailVerified) return <Navigate to="/emailVerification" replace />;
  return children;
};


const App = () => {
  const user = useUserStore((state) => state.user);
  const isCheckingAuth = useUserStore((state) => state.isCheckingAuth);

  useEffect(() => {
    useUserStore.getState().checkAuth();
  }, []);

  return (
    <>
      <Toaster />
      <Suspense fallback={<LazyLoading />}>
        <Routes>
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated user={user} isCheckingAuth={isCheckingAuth}>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated user={user} isCheckingAuth={isCheckingAuth}>
                <Signup />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/emailVerification"
            element={
              isCheckingAuth ? (
                <LazyLoading />
              ) : !user ? (
                <Navigate to="/login" replace />
              ) : user.emailVerified ? (
                <Navigate to="/" replace />
              ) : (
                <EmailVerification />
              )
            }
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user} isCheckingAuth={isCheckingAuth}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;