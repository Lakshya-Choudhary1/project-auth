import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserStore } from "./store/useUserStore.js";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home.jsx"));
const EmailVerification = lazy(() => import("./pages/EmailVerification.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const LazyLoading = lazy(() => import("./pages/LazyLoading.jsx"));

const ProtectedRoute = ({ children, user, isCheckingAuth }) => {
  if (isCheckingAuth) {
    return <LazyLoading />;
  }

  if (user && user.emailVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AuthenticatedRoute = ({ children, user, isCheckingAuth }) => {
  if (isCheckingAuth) {
    return <LazyLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/emailVerification" replace />;
  }

  return children;
};

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Toaster />

      <Suspense fallback={<LazyLoading />}>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={user} isCheckingAuth={isCheckingAuth}>
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute user={user} isCheckingAuth={isCheckingAuth}>
                <Signup />
              </ProtectedRoute>
            }
          />

          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <AuthenticatedRoute user={user} isCheckingAuth={isCheckingAuth}>
                <Home />
              </AuthenticatedRoute>
            }
          />

          <Route path="/lazyLoading" element={<LazyLoading />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;