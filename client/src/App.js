

import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DailySummary from './components/DailySummary';
import HistoricalTrends from './components/HisotricalTrends';
import Navbar from './components/NavBar';
import SetThresholds from './components/setThresholds';
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<DailySummary />} />
          <Route path="/historical-trends" element={<HistoricalTrends />} />
          <Route path="/set-thresholds" element={<SetThresholds />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
