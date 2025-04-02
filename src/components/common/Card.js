// src/components/common/Card.jsx
import React from "react";
import { useUserPreferences } from "../../context/UserPreferencesContext";

const Card = ({ title, children, actions }) => {
  const { preferences } = useUserPreferences();
  const { theme } = preferences;

  // Inline styles
  const cardContainerStyle = {
    backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
    borderRadius: '8px',
    boxShadow: theme === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: `1px solid ${theme === 'dark' ? '#444' : '#f0f0f0'}`,
    cursor: 'move',
  };

  const cardTitleStyle = {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: theme === 'dark' ? '#ffffff' : '#333',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  };

  const dragHandleStyle = {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    opacity: 0.5,
    transition: 'opacity 0.2s',
  };

  const cardContentStyle = {
    minHeight: '100px',
    color: theme === 'dark' ? '#ffffff' : 'inherit',
  };

  // Handle hover effects with JS since we can't use CSS pseudo classes with inline styles
  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    const dragHandle = e.currentTarget.querySelector('.drag-handle');
    if (dragHandle) {
      dragHandle.style.opacity = '1';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    const dragHandle = e.currentTarget.querySelector('.drag-handle');
    if (dragHandle) {
      dragHandle.style.opacity = '0.5';
    }
  };

  return (
    <div 
      style={cardContainerStyle} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={cardHeaderStyle}>
        <h3 style={cardTitleStyle}>
          <div className="drag-handle" style={dragHandleStyle}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H16M8 12H16M8 18H16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"/>
            </svg>
          </div>
          {title}
        </h3>
        {actions && <div>{actions}</div>}
      </div>
      <div style={cardContentStyle}>{children}</div>
    </div>
  );
};

export default Card;
