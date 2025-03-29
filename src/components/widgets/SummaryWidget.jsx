// src/components/widgets/SummaryWidget.jsx
import React from "react";
import styled from "@emotion/styled";
import Card from "../common/Card";
import { recentActivities } from "../../data/mockData";

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.type) {
      case "completion":
        return "#4caf50";
      case "milestone":
        return "#2196f3";
      case "streak":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p`
  margin: 0 0 4px 0;
`;

const ActivityTime = styled.span`
  font-size: 12px;
  color: #757575;
`;

// Función auxiliar para formatear fechas
const formatDate = (dateString) => {
  try {
    if (!dateString) return "Fecha desconocida";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Error de fecha";
  }
};

// Función para determinar el ícono según el tipo
const getIconForType = (type) => {
  switch (type) {
    case "completion":
      return "✓";
    case "milestone":
      return "🏆";
    case "streak":
      return "🔥";
    default:
      return "•";
  }
};

const SummaryWidget = () => {
  return (
    <Card title="Actividades Recientes">
      <ActivityList>
        {recentActivities.map((activity) => (
          <ActivityItem key={activity.id}>
            <ActivityIcon type={activity.type}>
              {getIconForType(activity.type)}
            </ActivityIcon>
            <ActivityContent>
              <ActivityText>{activity.text}</ActivityText>
              <ActivityTime>{formatDate(activity.timestamp)}</ActivityTime>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </Card>
  );
};

export default SummaryWidget;
