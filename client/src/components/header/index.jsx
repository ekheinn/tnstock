import { Link, Navigate } from "react-router-dom";
import { Navbar, NavItem, NavList } from "./style";

const Header = ({ isAuthenticated, handleLogout }) => {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/about">Sobre</Link>
        </NavItem>

        {isAuthenticated ? (
          <>
            <NavItem>
              <Link to="/dashboard">Painel</Link>
            </NavItem>

            <NavItem>
              <Link to="/edit-profile">Editar Perfil</Link>
            </NavItem>

            <button
              onClick={() => {
                handleLogout();
                Navigate("/login");
              }}
            >
              Sair
            </button>
          </>
        ) : (
          <NavItem>
            <Link to="/login">Entrar</Link>
          </NavItem>
        )}
      </NavList>
    </Navbar>
  );
};

export default Header;
