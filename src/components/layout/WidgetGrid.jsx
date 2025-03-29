// src/components/layout/WidgetGrid.jsx
import React from "react";
import styled from "@emotion/styled";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WidgetGrid = ({ children }) => {
  return <Grid>{children}</Grid>;
};

export default WidgetGrid;
