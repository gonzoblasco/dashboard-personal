// src/pages/DashboardPage.jsx
import React from "react";
import Dashboard from "../components/layout/Dashboard";
import ChartWidget from "../components/widgets/ChartWidget";
import ListWidget from "../components/widgets/ListWidget";
import CounterWidget from "../components/widgets/CounterWidget";
import SummaryWidget from "../components/widgets/SummaryWidget";
import {
  taskData,
  habitData,
  goalProgress,
  recentActivities,
} from "../data/mockData";
import { useUserPreferences } from "../context/UserPreferencesContext";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { preferences } = useUserPreferences();
  const { widgetLayout, widgetVisibility, widgetColors } = preferences;

  // Definir todos los widgets disponibles
  const widgetComponents = {
    tasks: {
      id: "tasks",
      component: (
        <div
          style={{
            borderTop: `3px solid ${widgetColors.tasks}`,
            display: widgetVisibility.tasks ? "block" : "none",
          }}
        >
          <ListWidget tasks={taskData} />
        </div>
      ),
    },
    habits: {
      id: "habits",
      component: (
        <div
          style={{
            borderTop: `3px solid ${widgetColors.habits}`,
            display: widgetVisibility.habits ? "block" : "none",
          }}
        >
          <ChartWidget data={habitData} />
        </div>
      ),
    },
    progress: {
      id: "progress",
      component: (
        <div
          style={{
            borderTop: `3px solid ${widgetColors.progress}`,
            display: widgetVisibility.progress ? "block" : "none",
          }}
        >
          <CounterWidget data={goalProgress} />
        </div>
      ),
    },
    activity: {
      id: "activity",
      component: (
        <div
          style={{
            borderTop: `3px solid ${widgetColors.activity}`,
            display: widgetVisibility.activity ? "block" : "none",
          }}
        >
          <SummaryWidget activities={recentActivities} />
        </div>
      ),
    },
  };

  // Crear la lista de widgets según el orden definido en las preferencias
  const orderedWidgets = widgetLayout
    .map((widgetId) => widgetComponents[widgetId])
    .filter((widget) => preferences.widgetVisibility[widget.id]);

  return (
    <div className="dashboard-page">
      <Dashboard widgets={orderedWidgets} />
    </div>
  );
};

export default DashboardPage;
