import styled from "styled-components";

export const Navbar = styled.nav`
  background-color: #333;
  padding: 1rem;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  margin: 0 1rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    &:hover {
      color: #61dafb;
    }
  }
`;
