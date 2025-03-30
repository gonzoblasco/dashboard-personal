// src/pages/DashboardPage.jsx
import React from "react";
import styled from "@emotion/styled";
import Header from "../components/layout/Header";
import WidgetGrid from "../components/layout/WidgetGrid";
import ChartWidget from "../components/widgets/ChartWidget";
import CounterWidget from "../components/widgets/CounterWidget";
import ListWidget from "../components/widgets/ListWidget";
import SummaryWidget from "../components/widgets/SummaryWidget";
import {
  tasksList,
  habitData,
  goalProgress,
  recentActivities,
} from "../data/mockData";
import { useUserPreferences } from "../context/UserPreferencesContext";

const MainContent = styled.main`
  padding: 20px;
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#f5f5f5")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
  min-height: calc(90vh);
`;

const DashboardPage = () => {
  const { preferences } = useUserPreferences();
  const { layout, theme } = preferences;

  // Crear un mapa de widgets por ID
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
          <ListWidget tasks={tasksList} />
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

  // Filtrar widgets visibles y ordenarlos por posición
  const visibleWidgets = layout
    .filter((widget) => widget.visible)
    .sort((a, b) => a.position - b.position)
    .map((widget) =>
      React.cloneElement(widgetComponents[widget.id], { key: widget.id }),
    );

  return (
    <div className="dashboard-container">
      <MainContent theme={theme}>
        <h1>Mi Dashboard</h1>
        <WidgetGrid>{visibleWidgets}</WidgetGrid>
      </MainContent>
    </div>
  );
};

export default DashboardPage;
