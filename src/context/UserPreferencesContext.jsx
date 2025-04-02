// src/context/UserPreferencesContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Default preferences
const defaultPreferences = {
  theme: "light",
  layout: [
    { id: "chart", visible: true, position: 0 },
    { id: "counter", visible: true, position: 1 },
    { id: "list", visible: true, position: 2 },
    { id: "summary", visible: true, position: 3 },
    { id: "visualization", visible: true, position: 4 },
    { id: "weather", visible: true, position: 5 },
  ],
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    accent: "#9b59b6",
    warning: "#e74c3c",
  },
};

// Create context
const UserPreferencesContext = createContext();

// Custom hook to access context
export const useUserPreferences = () => useContext(UserPreferencesContext);

// Context provider
export const UserPreferencesProvider = ({ children }) => {
  // Load saved preferences or use defaults
  const [preferences, setPreferences] = useState(() => {
    try {
      const savedPreferences = localStorage.getItem("userPreferences");
      return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
    } catch (error) {
      console.error("Error loading preferences from localStorage:", error);
      return defaultPreferences;
    }
  });

  // Save preferences to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("userPreferences", JSON.stringify(preferences));
    } catch (error) {
      console.error("Error saving preferences to localStorage:", error);
    }
  }, [preferences]);

  // Update all preferences
  const updatePreferences = (newPreferences) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      ...newPreferences,
    }));
  };

  // Update widget layout
  const updateWidgetLayout = (newLayout) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      layout: newLayout,
    }));
  };

  // Toggle widget visibility
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

  // Update a specific color
  const updateWidgetColor = (colorKey, color) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      colors: {
        ...prevPreferences.colors,
        [colorKey]: color,
      },
    }));
  };
  
  // Set theme directly
  const setTheme = (theme) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      theme,
    }));
  };
  
  // Reorder widgets based on their positions
  const reorderWidgets = (widgetIds) => {
    setPreferences((prevPreferences) => {
      const updatedLayout = [...prevPreferences.layout];
      
      // Update positions based on new order
      widgetIds.forEach((id, index) => {
        const widgetIndex = updatedLayout.findIndex(w => w.id === id);
        if (widgetIndex !== -1) {
          updatedLayout[widgetIndex] = {
            ...updatedLayout[widgetIndex],
            position: index
          };
        }
      });
      
      return {
        ...prevPreferences,
        layout: updatedLayout
      };
    });
  };

  // Context value
  const value = {
    preferences,
    updatePreferences,
    updateWidgetLayout,
    toggleWidgetVisibility,
    updateWidgetColor,
    setTheme,
    reorderWidgets
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
