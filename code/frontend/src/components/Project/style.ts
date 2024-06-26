import styled from 'styled-components';
import Button from '../Button';

export const ProjectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  color: #000;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  color: #000;
  border-radius: 8px 0 0 8px;
  transition: all 0.3s ease-in-out;
  align-content: center;
  align-content: center;
  padding: 15px 40px;
`;

export const ProjectDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #888;
  gap: 5px;
  margin: 0;
`;

export const ProjectDetailsPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const IsExpanded = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #000;
  cursor: pointer;
  height: auto;
  border-radius: ${(props) =>
    props.$isOpen ? '0 8px 0px 8px' : '0 8px 8px 0'};
  & * {
    color: white;
  }
  font-size: ${(props) => (props.$isOpen ? '12px' : '16px')};
  font-weight: ${(props) => (props.$isOpen ? 'normal' : 'bold')};
  padding: ${(props) => (props.$isOpen ? '10px 20px' : '15px 40px')};
  transition: all 0.3s ease-in-out;
  align-content: center;

  & * {
    color: #000;
  }

  @media screen and (max-width: 768px) {
    font-size: 8px;
    padding: ${(props) => (props.$isOpen ? '10px 20px' : '6px 6px')};
  }
`;

export const ProjectActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .btn-delete * {
    color: #ff6a6a;
  }

  .btn-edit * {
    color: #329fc8;
  }

  .btn-link * {
    color: #32c834;
  }

  .btn-unlink * {
    color: #d6c900;
  }
`;

export const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectContent = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  margin-top: ${({ $isOpen }) => ($isOpen ? '30px' : 0)};
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? 'unset' : 0)};
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  gap: 20px;
  width: 100%;
`;

export const ProjectDescription = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

export const ModalUserContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const UserIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bfbfbf;
`;

export const UserDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 5px;
  flex-direction: column;
`;
