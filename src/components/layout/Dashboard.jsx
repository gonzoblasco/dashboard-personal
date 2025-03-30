import React from "react";
import styled from "@emotion/styled";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const WidgetContainer = styled.div`
  min-height: 200px;
`;

const Dashboard = ({ widgets }) => {
  return (
    <DashboardContainer>
      {widgets.map((widget) => (
        <WidgetContainer key={widget.id}>{widget.component}</WidgetContainer>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;