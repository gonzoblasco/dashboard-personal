// src/components/widgets/ChartWidget.jsx
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

const ChartWidget = () => {
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
          <Bar dataKey="completed" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartWidget;
