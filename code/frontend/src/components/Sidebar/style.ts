import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Sidenav = styled.div<{ $open: boolean }>`
  height: 100%;
  width: ${({ $open }) => ($open ? '250px' : '0')};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidenavHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 20px;
`;

export const SidenavClose = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

export const CloseBtn = styled.div`
  font-size: 36px;
  color: #000;
  &:hover {
    color: ${lighten(0.2, '#000')};
    cursor: pointer;
  }
`;

export const SidenavLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SidenavContent = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  gap: 10px;
`;

export const SidenavLink = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 12px;
  font-size: 18px;
  color: #000;
  transition: 0.3s;
  border-radius: 20px;
  gap: 10px;
  min-width: 80%;

  ${(props) =>
    props.$active &&
    css`
      background: #0c9f96;
      color: #fff;
    `};

  &:hover {
    background: #0c9f96;
    color: #fff;
    cursor: pointer;
  }
`;

export const SidenavFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 10px;
  border-top: 1px solid #e2e8f0;

  &:hover {
    cursor: pointer;
    background: ${darken(0.1, '#fff')};
  }
`;

export const SignOutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #000;
  gap: 10px;
`;
