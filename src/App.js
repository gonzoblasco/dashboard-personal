// src/App.jsx (actualizado)
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import { UserPreferencesProvider } from "./context/UserPreferencesContext";

function App() {
  return (
    <UserPreferencesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </UserPreferencesProvider>
  );
}

export default App;
