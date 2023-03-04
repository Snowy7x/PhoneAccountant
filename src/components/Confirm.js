import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  InputGroup,
  Flex,
  useToast,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Confirm({ isOpen, onClose, message, action }) {
  const [member, setMember] = useState({});
  const toast = useToast();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(350deg)"
    />
  );
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <OverlayOne />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={700} fontSize="xl" color="red.300" mb={6}>
            {message}
          </Text>
        </ModalBody>
        <ModalFooter
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button colorScheme="red" onClick={action}>
            Confirm
          </Button>
          <Button colorScheme="green" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
