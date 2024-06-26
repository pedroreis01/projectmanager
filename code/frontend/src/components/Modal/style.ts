import { darken } from 'polished';
import styled from 'styled-components';

export const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  &.show-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ModalContent = styled.div`
  background-color: #fff;
  max-width: 50vw;
  max-height: 90vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-width: 20vw;

  @media (max-width: 900px) {
    max-width: 90vw;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #000;
  padding: 5% 5% 1% 5%;
  gap: 10px;
`;

export const CloseIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 30px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
  &,
  * {
    color: #ff4444;
  }
  &:hover {
    background: ${darken(0.1, '#fff')};
  }
`;

export const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  background: #fff;
  border-radius: 0 0 10px 10px;
  padding: 5%;
  gap: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  width: 100%;
  padding-top: 5%;
  gap: 20px;
`;
