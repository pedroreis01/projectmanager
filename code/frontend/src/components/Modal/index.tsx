import React, { useEffect, useRef } from 'react';
import * as C from './style';
import { IoIosClose } from 'react-icons/io';

interface ModalProps {
  titleHeader?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <C.ModalFooter>{children}</C.ModalFooter>;
};

const Modal: React.FC<ModalProps> = ({
  titleHeader,
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.classList.add('show-modal');
      } else {
        modalElement.classList.remove('show-modal');
      }
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <C.Modal ref={modalRef}>
      <C.ModalContent>
        {titleHeader && (
          <C.ModalHeader>
            {titleHeader}
            <C.CloseIcon onClick={handleCloseModal}>
              <IoIosClose />
            </C.CloseIcon>
          </C.ModalHeader>
        )}
        <C.ModalBody>{children}</C.ModalBody>
      </C.ModalContent>
    </C.Modal>
  );
};

export default Modal;
