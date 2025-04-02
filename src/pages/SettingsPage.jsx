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
  background: ${props => props.theme === 'dark' ? '#1e1e1e' : 'white'};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : 'inherit'};
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#333' : '#f0f0f0'};
  padding-bottom: 12px;
`;

const SectionDescription = styled.p`
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666'};
  font-size: 14px;
  margin-bottom: 16px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f8ff'};
  border-left: 4px solid ${props => props.theme === 'dark' ? '#4a90e2' : '#3498db'};
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
  
  svg {
    margin-right: 12px;
    min-width: 24px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
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
  background: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f9f9f9'};
  border-radius: 4px;
`;

const WidgetTitle = styled.span`
  font-weight: 500;
`;

const ThemeToggle = styled.div`
  display: flex;
  gap: 12px;
`;

const MainTitle = styled.h1`
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : 'inherit'};
`;

const BackButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const SettingsPage = () => {
  const { preferences, toggleWidgetVisibility, updateWidgetColor, updatePreferences } =
    useUserPreferences();
  const { theme, colors } = preferences;

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
    visualization: "Análisis de Productividad",
    weather: "Pronóstico del Tiempo",
  };

  // Manejar cambio de color
  const handleColorChange = (colorKey, value) => {
    updateWidgetColor(colorKey, value);
  };
  
  // This function is now handled directly with updatePreferences

  return (
    <SettingsContainer>
      <MainTitle theme={theme}>Configuración del Dashboard</MainTitle>

      <BackButtonContainer>
        <Link to="/">
          <Button variant="secondary">Volver al Dashboard</Button>
        </Link>
      </BackButtonContainer>

      <Section theme={theme}>
        <SectionTitle theme={theme}>Tema</SectionTitle>
        <ThemeToggle>
          <Button
            variant={theme === "light" ? "primary" : "secondary"}
            onClick={() => updatePreferences({ theme: "light" })}
          >
            Claro
          </Button>
          <Button
            variant={theme === "dark" ? "primary" : "secondary"}
            onClick={() => updatePreferences({ theme: "dark" })}
          >
            Oscuro
          </Button>
        </ThemeToggle>
      </Section>

      <Section theme={theme}>
        <SectionTitle theme={theme}>Colores</SectionTitle>
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

      <Section theme={theme}>
        <SectionTitle theme={theme}>Widgets</SectionTitle>
        
        <InfoBox theme={theme}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p><strong>¡Nuevo!</strong> Ahora puedes reordenar tus widgets directamente en el dashboard. Simplemente arrastra y suelta los widgets para cambiar su posición.</p>
        </InfoBox>
        
        <InfoBox theme={theme} style={{ background: theme === 'dark' ? '#2a2f3a' : '#f0f8ff', borderLeftColor: colors.accent }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" 
              stroke="currentColor" fill="currentColor"/>
          </svg>
          <p><strong>¡Widget nuevo!</strong> Se ha añadido un nuevo widget de "Análisis de Productividad" con gráficos interactivos. Visualiza tus datos de productividad con múltiples filtros y métricas.</p>
        </InfoBox>
        
        <SectionDescription theme={theme}>Controla qué widgets quieres mostrar en tu dashboard:</SectionDescription>
        
        {sortedWidgets.map((widget) => (
          <WidgetItem key={widget.id} theme={theme}>
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
