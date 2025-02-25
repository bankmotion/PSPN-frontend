import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Index";
import Dashboard from "./pages/Dashboard/Dashboard";
import Swap from "./pages/Swap/Swap";
import UFC from "./pages/UFC/UFC";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/swap" element={<Swap />} /> */}

          <Route path="/ufc" element={<UFC />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
