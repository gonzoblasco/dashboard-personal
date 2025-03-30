// src/components/common/Button.jsx
import React from "react";
import styled from "@emotion/styled";

// Removed ButtonBase component as we're now using direct styled buttons

const PrimaryButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #1976d2;
  color: white;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1565c0;
  }
`;

const SecondaryButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: rgba(25, 118, 210, 0.04);
  }
`;

const Button = ({ children, variant = "primary", icon, ...props }) => {
  const ButtonComponent =
    variant === "primary" ? PrimaryButton : SecondaryButton;

  return (
    <ButtonComponent {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </ButtonComponent>
  );
};

export default Button;
