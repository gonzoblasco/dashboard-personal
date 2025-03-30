// src/context/UserPreferencesContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Valores por defecto
const defaultPreferences = {
  theme: "light",
  layout: [
    { id: "chart", visible: true, position: 0 },
    { id: "counter", visible: true, position: 1 },
    { id: "list", visible: true, position: 2 },
    { id: "summary", visible: true, position: 3 },
  ],
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#9b59b6",
    warning: "#e74c3c",
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
      layout: newLayout,
    }));
  };

  // Función para actualizar la visibilidad de un widget
  const toggleWidgetVisibility = (widgetId) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      layout: prevPreferences.layout.map(widget => 
        widget.id === widgetId 
          ? { ...widget, visible: !widget.visible } 
          : widget
      ),
    }));
  };

  // Función para actualizar el color de un widget
  const updateWidgetColor = (colorKey, color) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      colors: {
        ...prevPreferences.colors,
        [colorKey]: color,
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
