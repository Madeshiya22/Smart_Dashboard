import React, { Suspense, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Logs } from "lucide-react";
import "./App.css";
import { Pencil } from "lucide-react";


const Home = React.lazy(() => import("./pages/Home"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const Products = React.lazy(() => import("./pages/Products"));
const Settings = React.lazy(() => import("./pages/Settings"));

export default function App() {
  const [humberger, setHumberger] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${humberger ? "humberger" : ""}`}>
        <button
          className="humberger-btn"
          onClick={() => setHumberger(!humberger)}
        >
         {humberger ? <Logs size={25} style={{ color: "#6b6dff"}} strokeWidth={2.5} /> : <div className="humberger-icon">X</div>}
        </button>

        <h2>Smart Dashboard</h2>

        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          Performance Optimized Dashboard 🚀
        </div>

        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              }
            />

            <Route
              path="/analytics"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Analytics />
                </motion.div>
              }
            />

            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}