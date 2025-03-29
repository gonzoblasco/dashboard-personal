// src/components/layout/Header.jsx
import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #333;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Dashboard Personal</Logo>
      <Nav>
        <Button variant="secondary">
          <Link to="/settings">Configuración</Link>
        </Button>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
