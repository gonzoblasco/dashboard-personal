// src/components/widgets/CounterWidget.jsx
import React from "react";
import styled from "@emotion/styled";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "../common/Card";
import { goalProgress } from "../../data/mockData";
import { useUserPreferences } from "../../context/UserPreferencesContext";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
`;

const ProgressLabel = styled.div`
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const CounterWidget = () => {
  // Obtener preferencias del usuario
  const { preferences } = useUserPreferences();
  const { colors } = preferences;

  const { current, target, title } = goalProgress;
  const percentage = (current / target) * 100;

  // Datos para gráfico circular
  const data = [
    { name: "Completado", value: current },
    { name: "Restante", value: target - current },
  ];

  const COLORS = [colors.primary, colors.secondary];

  return (
    <Card title={title}>
      <CounterContainer>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ProgressLabel>{`${current}%`}</ProgressLabel>
      </CounterContainer>
    </Card>
  );
};

export default CounterWidget;
