// src/components/widgets/CounterWidget.jsx
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "../common/Card";
import Button from "../common/Button";
import { goalProgress as initialGoal } from "../../data/mockData";
import { useUserPreferences } from "../../context/UserPreferencesContext";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  position: relative;
`;

const ProgressLabel = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  position: absolute;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

// Using a regular styled div instead of extending Button
const ButtonWrapper = styled.div`
  & > button {
    min-width: 40px;
  }
`;

const GoalInput = styled.input`
  width: 80px;
  padding: 8px;
  text-align: center;
  margin: 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CounterWidget = () => {
  // Estado para el progreso del objetivo
  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem("goalProgress");
    return savedGoal ? JSON.parse(savedGoal) : initialGoal;
  });

  // Estado para modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado temporal para edición
  const [editValues, setEditValues] = useState({
    current: 0,
    target: 100,
  });

  // Obtener preferencias del usuario
  const { preferences } = useUserPreferences();
  const { colors } = preferences;

  // Guardar progreso en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("goalProgress", JSON.stringify(goal));
  }, [goal]);

  // Extraer valores del objetivo
  const { current, target, title } = goal;

  // Calcular porcentaje
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));

  // Datos para gráfico circular
  const data = [
    { name: "Completado", value: current },
    { name: "Restante", value: target - current },
  ];

  // Colores para gráficos
  const COLORS = [colors.secondary, "#EEEEEE"];

  // Manejar incremento del progreso
  const handleIncrement = () => {
    setGoal((prev) => ({
      ...prev,
      current: Math.min(prev.target, prev.current + 1),
    }));
  };

  // Manejar decremento del progreso
  const handleDecrement = () => {
    setGoal((prev) => ({
      ...prev,
      current: Math.max(0, prev.current - 1),
    }));
  };

  // Iniciar modo de edición

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
