// src/components/widgets/VisualizationWidget.jsx
import React, { useState } from "react";
import Card from "../common/Card";
import { useUserPreferences } from "../../context/UserPreferencesContext";
import { productivityData } from "../../data/mockData";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const VisualizationWidget = () => {
  const { preferences } = useUserPreferences();
  const { colors, theme } = preferences;
  const [visibleMetrics, setVisibleMetrics] = useState({
    focusTime: true,
    tasksCompleted: true,
    efficiency: true
  });
  const [timeRange, setTimeRange] = useState("year"); // year, quarter, month

  // Filter data based on selected time range
  const getFilteredData = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    if (timeRange === "year") {
      return productivityData;
    } else if (timeRange === "quarter") {
      const quarterMonths = [
        currentMonth,
        (currentMonth + 11) % 12,
        (currentMonth + 10) % 12
      ];
      return productivityData.filter(item => {
        const monthIndex = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"].indexOf(item.date);
        return quarterMonths.includes(monthIndex);
      });
    } else if (timeRange === "month") {
      const currentMonthName = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][currentMonth];
      return productivityData.filter(item => item.date === currentMonthName);
    }
    return productivityData;
  };

  const filteredData = getFilteredData();

  // Calculate max domain values for each axis
  const maxFocusTime = Math.max(...productivityData.map(d => d.focusTime)) * 1.1;
  const maxTasks = Math.max(...productivityData.map(d => d.tasksCompleted)) * 1.1;

  // Styles for buttons
  const buttonStyle = {
    padding: "6px 12px",
    margin: "0 4px 12px 0",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "12px",
    backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
    color: theme === 'dark' ? '#fff' : '#333',
    transition: "all 0.2s ease"
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: colors.primary,
    color: "#fff"
  };

  // Toggle metrics visibility
  const toggleMetric = (metric) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  return (
    <Card title="Análisis de Productividad">
      <div style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "12px" }}>
          <button 
            style={timeRange === "year" ? activeButtonStyle : buttonStyle}
            onClick={() => setTimeRange("year")}
          >
            Año completo
          </button>
          <button 
            style={timeRange === "quarter" ? activeButtonStyle : buttonStyle}
            onClick={() => setTimeRange("quarter")}
          >
            Último trimestre
          </button>
          <button 
            style={timeRange === "month" ? activeButtonStyle : buttonStyle}
            onClick={() => setTimeRange("month")}
          >
            Mes actual
          </button>
        </div>
        
        <div>
          <button 
            style={{
              ...buttonStyle,
              backgroundColor: visibleMetrics.focusTime ? colors.primary : (theme === 'dark' ? '#333' : '#f0f0f0'),
              color: visibleMetrics.focusTime ? "#fff" : (theme === 'dark' ? '#fff' : '#333'),
            }}
            onClick={() => toggleMetric("focusTime")}
          >
            Tiempo de Enfoque
          </button>
          <button 
            style={{
              ...buttonStyle,
              backgroundColor: visibleMetrics.tasksCompleted ? colors.accent : (theme === 'dark' ? '#333' : '#f0f0f0'),
              color: visibleMetrics.tasksCompleted ? "#fff" : (theme === 'dark' ? '#fff' : '#333'),
            }}
            onClick={() => toggleMetric("tasksCompleted")}
          >
            Tareas Completadas
          </button>
          <button 
            style={{
              ...buttonStyle,
              backgroundColor: visibleMetrics.efficiency ? colors.secondary : (theme === 'dark' ? '#333' : '#f0f0f0'),
              color: visibleMetrics.efficiency ? "#fff" : (theme === 'dark' ? '#fff' : '#333'),
            }}
            onClick={() => toggleMetric("efficiency")}
          >
            Eficiencia
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart
          data={filteredData}
          margin={{ top: 10, right: 10, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#eee'} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: theme === 'dark' ? '#ffffff' : '#333', fontWeight: theme === 'dark' ? 'bold' : 'normal' }}
          />
          
          {/* Focus Time Y-Axis (left) */}
          {visibleMetrics.focusTime && (
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              tick={{ fill: theme === 'dark' ? '#ffffff' : '#333', fontWeight: theme === 'dark' ? 'bold' : 'normal' }}
              tickFormatter={(value) => `${value}h`}
              domain={[0, maxFocusTime]}
            />
          )}
          
          {/* Tasks Completed Y-Axis (right) */}
          {visibleMetrics.tasksCompleted && (
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fill: theme === 'dark' ? '#ffffff' : '#333', fontWeight: theme === 'dark' ? 'bold' : 'normal' }}
              domain={[0, maxTasks]}
            />
          )}
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#444' : '#fff',
              borderColor: theme === 'dark' ? '#666' : '#ddd',
              color: theme === 'dark' ? '#ffffff' : '#333'
            }}
            formatter={(value, name) => {
              if (name === "Tiempo de Enfoque") return [`${value} horas`, name];
              if (name === "Tareas Completadas") return [`${value} tareas`, name];
              if (name === "Eficiencia") return [`${value}%`, name];
              return [value, name];
            }}
          />
          
          <Legend 
            wrapperStyle={{ paddingTop: "10px" }} 
            formatter={(value) => <span style={{ color: theme === 'dark' ? '#ffffff' : '#333', fontWeight: theme === 'dark' ? 'bold' : 'normal' }}>{value}</span>}
          />
          
          {/* Focus Time - Line */}
          {visibleMetrics.focusTime && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="focusTime"
              name="Tiempo de Enfoque"
              stroke={colors.primary}
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          )}
          
          {/* Tasks Completed - Bar */}
          {visibleMetrics.tasksCompleted && (
            <Bar
              yAxisId="right"
              dataKey="tasksCompleted"
              name="Tareas Completadas"
              fill={colors.accent}
              barSize={20}
              radius={[2, 2, 0, 0]}
            />
          )}
          
          {/* Efficiency - Area */}
          {visibleMetrics.efficiency && (
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="efficiency"
              name="Eficiencia"
              stroke={colors.secondary}
              fill={colors.secondary}
              fillOpacity={0.3}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VisualizationWidget;