import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './Pages/HomePage';
import DashboardPage from './Pages/DashboardPage';
import SearchPage from './components/SearchPage';
import ExplorePage from './components/ExplorePage';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/in" element={<DashboardPage />} />
      <Route path="/in/search" element={<SearchPage />} />
      <Route path="/in/explore/:username" element={<ExplorePage />} />
      <Route path="/in/profile" element={<ProfilePage />} />

    </Routes>
  );
}

export default App;
