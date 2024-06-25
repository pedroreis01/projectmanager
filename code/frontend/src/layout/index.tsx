import React, { useState } from 'react';
import * as C from './style';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FiMenu } from 'react-icons/fi';
import Container from '../components/Container';

interface ILayout {
  children: React.ReactNode;
}

//rotas que não possuem layout
const routesAdmin = ['/meus-projetos', '/tarefas'];

export const Layout: React.FC<ILayout> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const onClose = () => setOpen(false);

  const location = useLocation();

  return routesAdmin.includes(location.pathname) ||
    location.pathname.startsWith(routesAdmin[1]) ? (
    <C.ContentWrapper>
      <Container background="gray" p="40px 50px">
        <C.MenuWrapper $open={open} onClick={() => setOpen(true)}>
          <FiMenu size={20} />
        </C.MenuWrapper>
        <Sidebar open={open} onClose={onClose} pathname={location.pathname} />
        <C.ContentSidebarWrapper $open={open} id="div-layout">
          {children}
        </C.ContentSidebarWrapper>
      </Container>
    </C.ContentWrapper>
  ) : (
    <C.ContentWrapper>{children}</C.ContentWrapper>
  );
};
