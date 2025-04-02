// src/pages/DashboardPage.jsx
import React from "react";
import styled from "@emotion/styled";
import WidgetGrid from "../components/layout/WidgetGrid";
import ChartWidget from "../components/widgets/ChartWidget";
import CounterWidget from "../components/widgets/CounterWidget";
import ListWidget from "../components/widgets/ListWidget";
import SummaryWidget from "../components/widgets/SummaryWidget";
import VisualizationWidget from "../components/widgets/VisualizationWidget";
import WeatherWidget from "../components/widgets/WeatherWidget";
import { useUserPreferences } from "../context/UserPreferencesContext";

const MainContent = styled.main`
  padding: 20px;
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#f5f5f5")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
  min-height: calc(90vh);
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DashboardTitle = styled.h1`
  margin: 0;
  color: ${props => props.theme === 'dark' ? '#ffffff' : 'inherit'};
  font-weight: ${props => props.theme === 'dark' ? '600' : '500'};
  text-shadow: ${props => props.theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'};
`;

const DragModeIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#666'};
  background-color: ${props => props.theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)'};
  padding: 6px 10px;
  border-radius: 4px;
  
  svg {
    margin-right: 8px;
  }
`;

const DashboardPage = () => {
  const { preferences, updateWidgetLayout } = useUserPreferences();
  const { layout, theme } = preferences;

  // Widget components map
  const widgetComponents = {
    chart: <ChartWidget />,
    counter: <CounterWidget />,
    list: <ListWidget />,
    summary: <SummaryWidget />,
    visualization: <VisualizationWidget />,
    weather: <WeatherWidget />,
  };

  // Filter visible widgets and sort by position
  const visibleWidgets = layout
    .filter((widget) => widget.visible)
    .sort((a, b) => a.position - b.position)
    .map((widget) =>
      React.cloneElement(widgetComponents[widget.id], { key: widget.id }),
    );

  // Handle widget reordering
  const handleOrderChange = (newOrder) => {
    // Create a new layout with updated positions
    const updatedLayout = [...layout];
    
    // Update positions based on the new order
    newOrder.forEach((widgetId, index) => {
      const widgetIndex = updatedLayout.findIndex(w => w.id === widgetId);
      if (widgetIndex !== -1) {
        updatedLayout[widgetIndex] = {
          ...updatedLayout[widgetIndex],
          position: index
        };
      }
    });
    
    // Update the context with the new layout
    updateWidgetLayout(updatedLayout);
  };

  return (
    <div className="dashboard-container">
      <MainContent theme={theme}>
        <DashboardHeader>
          <DashboardTitle>Mi Dashboard</DashboardTitle>
          <DragModeIndicator theme={theme}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 19V17M7 14V12M7 9V7M11 19V17M11 14V12M11 9V7M15 19V17M15 14V12M15 9V7M19 19V17M19 14V12M19 9V7" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Drag widgets to reorder
          </DragModeIndicator>
        </DashboardHeader>
        <WidgetGrid onOrderChange={handleOrderChange}>{visibleWidgets}</WidgetGrid>
      </MainContent>
    </div>
  );
};

export default DashboardPage;
