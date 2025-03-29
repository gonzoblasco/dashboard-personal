// src/pages/DashboardPage.jsx
import React from "react";
import Header from "../components/layout/Header";
import WidgetGrid from "../components/layout/WidgetGrid";

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <main>
        <h1>Mi Dashboard</h1>
        <WidgetGrid>{/* Aquí irán los widgets */}</WidgetGrid>
      </main>
    </div>
  );
};

export default DashboardPage;
