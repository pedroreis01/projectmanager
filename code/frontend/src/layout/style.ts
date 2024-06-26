import { lighten } from 'polished';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const ContentSidebarWrapper = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  transition: margin-left 0.5s;
  margin-left: ${({ $open }) => ($open ? '250px' : '0')};
  height: 100%;
  width: ${({ $open }) => ($open ? 'calc(100% - 300px)' : '90%')};
  @media only screen and (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const TitleContentSidebar = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 10px;
  width: 100%;
`;

export const MenuWrapper = styled.div<{ $open: boolean }>`
  padding: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.12) 0px 1px 3px,
    rgba(0, 0, 0, 0.24) 0px 1px 2px;
  display: ${({ $open }) => ($open ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 5px;
  border-radius: 5px;
  background: #0c9f96;
  color: #fff;

  &:hover {
    cursor: pointer;
    background: ${lighten(0.1, '#0c9f96')};
  }
`;
