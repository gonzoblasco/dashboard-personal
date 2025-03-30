// src/context/UserPreferencesContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Valores predeterminados para las preferencias
const defaultPreferences = {
  theme: "light",
  layout: [
    { id: "chart", position: 0, visible: true },
    { id: "counter", position: 1, visible: true },
    { id: "list", position: 2, visible: true },
    { id: "summary", position: 3, visible: true },
  ],
  colors: {
    primary: "#1976d2",
    secondary: "#8884d8",
    accent: "#4CAF50",
  },
};

// Crear el contexto
const UserPreferencesContext = createContext();

// Hook personalizado para acceder al contexto
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences debe usarse dentro de un UserPreferencesProvider",
    );
  }
  return context;
};

// Proveedor del contexto
export const UserPreferencesProvider = ({ children }) => {
  // Estado para las preferencias
  const [preferences, setPreferences] = useState(() => {
    // Intentar cargar preferencias desde localStorage
    const savedPreferences = localStorage.getItem("userPreferences");
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  // Guardar preferencias en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  // Función para actualizar preferencias
  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPreferences,
    }));
  };

  // Función para actualizar la visibilidad de un widget
  const toggleWidgetVisibility = (widgetId) => {
    setPreferences((prev) => ({
      ...prev,
      layout: prev.layout.map((widget) =>
        widget.id === widgetId
          ? { ...widget, visible: !widget.visible }
          : widget,
      ),
    }));
  };

  // Función para reordenar widgets
  const reorderWidgets = (newOrder) => {
    setPreferences((prev) => ({
      ...prev,
      layout: prev.layout.map((widget, index) => ({
        ...widget,
        position:
          newOrder.indexOf(widget.id) >= 0
            ? newOrder.indexOf(widget.id)
            : index,
      })),
    }));
  };

  // Función para cambiar el tema
  const setTheme = (theme) => {
    setPreferences((prev) => ({
      ...prev,
      theme,
    }));
  };

  // Función para actualizar colores
  const updateColors = (colorUpdate) => {
    setPreferences((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...colorUpdate,
      },
    }));
  };

  // Valor que se proporcionará a través del contexto
  const value = {
    preferences,
    updatePreferences,
    toggleWidgetVisibility,
    reorderWidgets,
    setTheme,
    updateColors,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
