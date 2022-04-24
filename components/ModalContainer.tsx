import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';

type ModalContainerProps = {
  heading: string;
  children: (onClose: () => void) => React.ReactNode;
  unstyled?: boolean;
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  heading,
  unstyled = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        width={unstyled ? '100%' : 'auto'}
        variant={unstyled ? 'unstyled' : 'solid'}
        textAlign={unstyled ? 'left' : 'center'}
        onClick={onOpen}
        pl={unstyled ? '2' : 'auto'}
      >
        {heading}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children(onClose)}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalContainer;
