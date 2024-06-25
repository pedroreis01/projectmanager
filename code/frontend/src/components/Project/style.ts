import styled from 'styled-components';
import Button from '../Button';

export const ProjectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid #003740;
  background-color: #001b20;
  border-radius: 12px;
  margin-bottom: 10px;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div<{ $isOpen: boolean }>`
  background-color: #002c33;
  color: #00dcff;
  border-radius: ${(props) =>
    props.$isOpen ? '12px 0px 12px 0px' : '12px 0 0 12px'};
  & * {
    color: white;
  }
  font-size: ${(props) => (props.$isOpen ? '12px' : '16px')};
  font-weight: ${(props) => (props.$isOpen ? 'normal' : 'bold')};
  padding: ${(props) => (props.$isOpen ? '10px 20px' : '15px 40px')};
  transition: all 0.3s ease-in-out;
  align-content: center;
  align-content: center;

  @media screen and (max-width: 768px) {
    font-size: 11px;
    padding: ${(props) => (props.$isOpen ? '10px 20px' : '6px 6px')};
  }
`;

export const IsExpanded = styled(Button)<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #002c33;
  color: #fff;
  border-radius: ${(props) =>
    props.$isOpen ? '0 12px 0px 12px' : '0 12px 12px 0'};
  & * {
    color: white;
  }
  font-size: ${(props) => (props.$isOpen ? '12px' : '16px')};
  font-weight: ${(props) => (props.$isOpen ? 'normal' : 'bold')};
  padding: ${(props) => (props.$isOpen ? '10px 20px' : '15px 40px')};
  transition: all 0.3s ease-in-out;
  align-content: center;

  @media screen and (max-width: 768px) {
    font-size: 8px;
    padding: ${(props) => (props.$isOpen ? '10px 20px' : '6px 6px')};
  }
`;

export const NumberOfDocs = styled.div<{ $isOpen: boolean }>`
  color: #fff;
  display: ${(props) => (props.$isOpen ? 'none' : 'block')};
  padding: ${(props) => (props.$isOpen ? '10px 20px' : '15px 40px')};
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 6px 6px;
  }
`;

export const NumberTasksDesktop = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
export const NumberTasksMobile = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectContent = styled.div<{ $isOpen: boolean }>`
  margin-top: ${({ $isOpen }) => ($isOpen ? '30px' : 0)};
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : 0)};
  /* max-height:  */
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
`;
