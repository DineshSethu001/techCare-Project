import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Routes>

      {/* Main SPA */}
      <Route path="/" element={<Home />} />

      {/* Future admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin/>}/>
      

    </Routes>
  );
};

export default App;