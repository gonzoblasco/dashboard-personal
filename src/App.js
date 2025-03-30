// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserPreferencesProvider } from "./context/UserPreferencesContext";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import Header from "./components/layout/Header";
import "./App.css";

function App() {
  return (
    <UserPreferencesProvider>
      <Router>
        <div className="app">
          <Header title="Dashboard Personal" />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserPreferencesProvider>
  );
}

export default App;
