// src/pages/SettingsPage.jsx
import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useUserPreferences } from "../context/UserPreferencesContext";
import Button from "../components/common/Button";

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 32px;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
`;

const ColorOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ColorLabel = styled.label`
  margin-right: 12px;
  min-width: 120px;
`;

const ColorInput = styled.input`
  padding: 4px;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;

const WidgetItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  background: #f9f9f9;
  border-radius: 4px;
`;

const WidgetTitle = styled.span`
  font-weight: 500;
`;

const ThemeToggle = styled.div`
  display: flex;
  gap: 12px;
`;

const SettingsPage = () => {
  const { preferences, toggleWidgetVisibility, updateColors, setTheme } =
    useUserPreferences();

  // Obtener widgets ordenados por posición
  const sortedWidgets = [...preferences.layout].sort(
    (a, b) => a.position - b.position,
  );

  // Mapeo de IDs a nombres amigables
  const widgetNames = {
    chart: "Gráfico de Hábitos",
    counter: "Progreso de Objetivos",
    list: "Lista de Tareas",
    summary: "Actividad Reciente",
  };

  // Manejar cambio de color
  const handleColorChange = (colorKey, value) => {
    updateColors({ [colorKey]: value });
  };

  return (
    <SettingsContainer>
      <h1>Configuración del Dashboard</h1>

      <Link to="/">
        <Button variant="secondary">Volver al Dashboard</Button>
      </Link>

      <Section>
        <SectionTitle>Tema</SectionTitle>
        <ThemeToggle>
          <Button
            variant={preferences.theme === "light" ? "primary" : "secondary"}
            onClick={() => setTheme("light")}
          >
            Claro
          </Button>
          <Button
            variant={preferences.theme === "dark" ? "primary" : "secondary"}
            onClick={() => setTheme("dark")}
          >
            Oscuro
          </Button>
        </ThemeToggle>
      </Section>

      <Section>
        <SectionTitle>Colores</SectionTitle>
        <ColorOption>
          <ColorLabel>Color primario:</ColorLabel>
          <ColorInput
            type="color"
            value={preferences.colors.primary}
            onChange={(e) => handleColorChange("primary", e.target.value)}
          />
        </ColorOption>
        <ColorOption>
          <ColorLabel>Color secundario:</ColorLabel>
          <ColorInput
            type="color"
            value={preferences.colors.secondary}
            onChange={(e) => handleColorChange("secondary", e.target.value)}
          />
        </ColorOption>
        <ColorOption>
          <ColorLabel>Color de acento:</ColorLabel>
          <ColorInput
            type="color"
            value={preferences.colors.accent}
            onChange={(e) => handleColorChange("accent", e.target.value)}
          />
        </ColorOption>
      </Section>

      <Section>
        <SectionTitle>Widgets Visibles</SectionTitle>
        {sortedWidgets.map((widget) => (
          <WidgetItem key={widget.id}>
            <WidgetTitle>{widgetNames[widget.id]}</WidgetTitle>
            <Button
              variant={widget.visible ? "primary" : "secondary"}
              onClick={() => toggleWidgetVisibility(widget.id)}
            >
              {widget.visible ? "Visible" : "Oculto"}
            </Button>
          </WidgetItem>
        ))}
      </Section>
    </SettingsContainer>
  );
};

export default SettingsPage;
