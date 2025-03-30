// src/components/widgets/ChartWidget.jsx (actualizado)
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../common/Card";
import { habitData } from "../../data/mockData";
import { useUserPreferences } from "../../context/UserPreferencesContext";

const ChartWidget = () => {
  // Obtener preferencias del usuario
  const { preferences } = useUserPreferences();
  const { colors } = preferences;

  return (
    <Card title="Seguimiento de Hábitos Semanales">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={habitData}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              `${value} de ${habitData.find((d) => d.day === name)?.total || 0}`,
              "Completados",
            ]}
          />
          <Bar
            dataKey="completed"
            // Usar color de las preferencias
            fill={colors.secondary}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartWidget;
