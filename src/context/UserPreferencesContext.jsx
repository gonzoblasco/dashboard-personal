// src/context/UserPreferencesContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Valores por defecto
const defaultPreferences = {
  theme: "light",
  widgetLayout: ["tasks", "habits", "progress", "activity"],
  widgetVisibility: {
    tasks: true,
    habits: true,
    progress: true,
    activity: true,
  },
  widgetColors: {
    tasks: "#3498db",
    habits: "#2ecc71",
    progress: "#9b59b6",
    activity: "#e74c3c",
  },
};

// Crear el contexto
const UserPreferencesContext = createContext();

// Hook personalizado para acceder al contexto
export const useUserPreferences = () => useContext(UserPreferencesContext);

// Proveedor del contexto
export const UserPreferencesProvider = ({ children }) => {
  // Intentar cargar preferencias guardadas o usar valores por defecto
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  // Guardar preferencias en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  // Función para actualizar preferencias
  const updatePreferences = (newPreferences) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      ...newPreferences,
    }));
  };

  // Función para actualizar el orden de los widgets
  const updateWidgetLayout = (newLayout) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      widgetLayout: newLayout,
    }));
  };

  // Función para actualizar la visibilidad de un widget
  const toggleWidgetVisibility = (widgetId) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      widgetVisibility: {
        ...prevPreferences.widgetVisibility,
        [widgetId]: !prevPreferences.widgetVisibility[widgetId],
      },
    }));
  };

  // Función para actualizar el color de un widget
  const updateWidgetColor = (widgetId, color) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      widgetColors: {
        ...prevPreferences.widgetColors,
        [widgetId]: color,
      },
    }));
  };

  // Valor que proporcionará el contexto
  const value = {
    preferences,
    updatePreferences,
    updateWidgetLayout,
    toggleWidgetVisibility,
    updateWidgetColor,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
