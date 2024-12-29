import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from '../pages/Index';

const AppRoutes = () => {
  const getDynamicRouteElement = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // Month is 0-indexed (0 = January, 11 = December)
    const cutoffMonth = 3; // January to April

    if (month <= cutoffMonth) {
      return <Navigate to={`/${year + 1}`} />;
    } else {
      return <Navigate to={`/${year}`} />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={getDynamicRouteElement()} />
        <Route path="/:year" element={<Index />} /> // Dynamic year route
      </Routes>
    </Router>
  );
};

export default AppRoutes;
