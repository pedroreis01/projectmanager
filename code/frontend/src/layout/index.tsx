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
const nonAdminRoutes = ['/'];

export const Layout: React.FC<ILayout> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const onClose = () => setOpen(false);

  const location = useLocation();

  const title = location.pathname.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  return !nonAdminRoutes.includes(location.pathname) ?(
    <C.ContentWrapper>
      <Container background="gray" p="2% 0">
        <C.MenuWrapper $open={open} onClick={() => setOpen(true)}>
          <FiMenu size={20} />
        </C.MenuWrapper>
        <Sidebar open={open} onClose={onClose} pathname={location.pathname} />
        <C.ContentSidebarWrapper $open={open} id="div-layout">
          <C.TitleContentSidebar>{title}</C.TitleContentSidebar>
          {children}
        </C.ContentSidebarWrapper>
      </Container>
    </C.ContentWrapper>
  ) : (
    <C.ContentWrapper>{children}</C.ContentWrapper>
  );
};
