// src/App.jsx — updated with /catering route (no header/footer)
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Header from "./components/layout/header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./components/about/About";
import Menu from "./components/menu/Menu";
import Contact from "./components/contact/Contact";
import Playstore from "./components/app/Playstore";
import Login from "./pages/Login";
import Rewards from "./pages/Rewards";
import Catering from "./pages/Catering";      
import PreviousOrders from "./pages/PreviousOrders";
import "./pages/Home.css";
import "./index.css";

// --- Protected Route ---
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" replace />;
};

// --- Redirect if already logged in ---
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return !user ? children : <Navigate to="/rewards" replace />;
};

// --- App Content ---
function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1c1000",
            color: "#f7d774",
            border: "1px solid rgba(247,215,116,0.2)",
          },
        }}
      />
      <Routes>
        {/* Auth page — no header/footer */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        {/* Rewards dashboard — protected, no header/footer */}
        <Route
          path="/rewards"
          element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          }
        />

        {/* Catering — protected, no header/footer */}
        <Route
          path="/catering"
          element={<Catering />}
        />

        {/* Catering Orders — protected, no header/footer */}
        <Route
          path="/catering/orders"
          element={
            <ProtectedRoute>
              <PreviousOrders />
            </ProtectedRoute>
          }
        />

        {/* All other routes — with Header + Footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main className="page-content">
                <Routes>
                  <Route path="/"              element={<Home />} />
                  <Route path="/about"         element={<About />} />
                  <Route path="/menu"          element={<Menu />} />
                  <Route path="/contact"       element={<Contact />} />
                  <Route path="/cherries-app"  element={<Playstore />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// --- Root ---
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
