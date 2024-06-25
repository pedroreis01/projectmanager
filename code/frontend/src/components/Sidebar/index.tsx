import React from 'react';
import * as C from './style';
import { routesLinks } from './routeLinks';
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import logo from '../../assets/images/logo.png';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}
const Sidebar: React.FC<SidebarProps> = ({ open, onClose, pathname }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const closeNav = () => {
    onClose();
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <C.Sidenav $open={open}>
      <C.SidenavHeader>
        <C.SidenavClose>
          <C.CloseBtn onClick={closeNav}>
            <IoIosClose />
          </C.CloseBtn>
        </C.SidenavClose>
        <C.SidenavLogo>
          <img src={logo} alt="" />
        </C.SidenavLogo>
      </C.SidenavHeader>

      <C.SidenavContent>
        {routesLinks.map((link) => (
          <C.SidenavLink
            onClick={() => navigateTo(link.path)}
            key={link.name}
            $active={link.path === pathname}
          >
            {<link.icon />}
            {link.name}
          </C.SidenavLink>
        ))}
      </C.SidenavContent>
      <C.SidenavFooter>
        <C.SignOutBtn onClick={signOut}>
        <FiLogOut /> Sair
        </C.SignOutBtn>
      </C.SidenavFooter>
    </C.Sidenav>
  );
};

export default Sidebar;
