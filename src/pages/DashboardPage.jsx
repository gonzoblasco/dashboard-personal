// src/pages/DashboardPage.jsx
import React from "react";
import Header from "../components/layout/Header";
import WidgetGrid from "../components/layout/WidgetGrid";
import ChartWidget from "../components/widgets/ChartWidget";
import CounterWidget from "../components/widgets/CounterWidget";
import ListWidget from "../components/widgets/ListWidget";
import SummaryWidget from "../components/widgets/SummaryWidget";

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <main>
        <h1>Mi Dashboard</h1>
        <WidgetGrid>
          <ChartWidget />
          <CounterWidget />
          <ListWidget />
          <SummaryWidget />
        </WidgetGrid>
      </main>
    </div>
  );
};

export default DashboardPage;
