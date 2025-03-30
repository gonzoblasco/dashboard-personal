// src/pages/SettingsPage.jsx
import React from "react";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useUserPreferences } from "../context/UserPreferencesContext";
import "./SettingsPage.css";

const SettingsPage = () => {
  const {
    preferences,
    toggleWidgetVisibility,
    updateWidgetColor,
    updateWidgetLayout,
  } = useUserPreferences();
  const { widgetVisibility, widgetColors, widgetLayout } = preferences;

  // Lista de widgets para la configuración
  const widgets = [
    { id: "tasks", name: "Lista de Tareas" },
    { id: "habits", name: "Gráfico de Hábitos" },
    { id: "progress", name: "Contador de Progreso" },
    { id: "activity", name: "Actividad Reciente" },
  ];

  // Función para manejar cambios en el orden de los widgets
  const moveWidget = (widgetId, direction) => {
    const currentIndex = widgetLayout.indexOf(widgetId);
    const newLayout = [...widgetLayout];

    if (direction === "up" && currentIndex > 0) {
      // Intercambiar con el widget anterior
      [newLayout[currentIndex], newLayout[currentIndex - 1]] = [
        newLayout[currentIndex - 1],
        newLayout[currentIndex],
      ];
    } else if (direction === "down" && currentIndex < widgetLayout.length - 1) {
      // Intercambiar con el widget siguiente
      [newLayout[currentIndex], newLayout[currentIndex + 1]] = [
        newLayout[currentIndex + 1],
        newLayout[currentIndex],
      ];
    }

    updateWidgetLayout(newLayout);
  };

  return (
    <div className="settings-page">
      <h2>Configuración del Dashboard</h2>

      <Card title="Widgets Visibles">
        <div className="widget-settings">
          {widgets.map((widget) => (
            <div key={widget.id} className="widget-setting-item">
              <label className="widget-setting-label">
                <input
                  type="checkbox"
                  checked={widgetVisibility[widget.id]}
                  onChange={() => toggleWidgetVisibility(widget.id)}
                />
                {widget.name}
              </label>
              <div className="widget-setting-controls">
                <div className="color-picker">
                  <span>Color:</span>
                  <input
                    type="color"
                    value={widgetColors[widget.id]}
                    onChange={(e) =>
                      updateWidgetColor(widget.id, e.target.value)
                    }
                  />
                </div>
                <div className="order-controls">
                  <Button
                    onClick={() => moveWidget(widget.id, "up")}
                    disabled={widgetLayout.indexOf(widget.id) === 0}
                    size="small"
                  >
                    ↑
                  </Button>
                  <Button
                    onClick={() => moveWidget(widget.id, "down")}
                    disabled={
                      widgetLayout.indexOf(widget.id) ===
                      widgetLayout.length - 1
                    }
                    size="small"
                  >
                    ↓
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="settings-actions">
        <Button variant="primary" onClick={() => (window.location.href = "/")}>
          Guardar y Volver
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
