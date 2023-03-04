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
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddProduct({ isOpen, onOpen, onClose, AddProduct }) {
  const [product, setProduct] = useState({});
  const toast = useToast();

  const handleAddProduct = () => {
    if (product.length <= 9) {
      return toast({
        title: `Fill all the fields`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `Adding the Product`,
        status: "info",
        isClosable: true,
      });

      if (!AddProduct)
        return toast({
          title: `Error: refresh the page please`,
          status: "error",
          isClosable: true,
        });

      AddProduct(product)
        .then((re) => {
          toast({
            title: `${re.message}`,
            status: re.code == 200 ? "success" : "error",
            isClosable: true,
          });
          if (re.code == 200) onClose();
        })
        .catch((e) => {
          toast({
            title: `Error: ${e}`,
            status: "error",
            isClosable: true,
          });
        });
    }
  };

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
        <ModalHeader>Add new product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="yellow" mb={6}>
            Please fill out these fields
          </Text>
          <InputGroup my={2}>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Type:</Text>
              <Input
                value={product.type}
                onChange={(e) =>
                  setProduct({ ...product, type: e.target.value })
                }
                placeholder="type"
                name="type"
                required
              />
            </Flex>
            <Flex direction="column" mx={1}>
              <Text mb={1}>color:</Text>
              <Input
                value={product.color}
                onChange={(e) =>
                  setProduct({ ...product, color: e.target.value })
                }
                placeholder="Red"
                name="type"
                required
              />
            </Flex>
          </InputGroup>
          <InputGroup my={2}>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Waterproof:</Text>
              <Input
                value={product.waterproof}
                onChange={(e) =>
                  setProduct({ ...product, waterproof: e.target.value })
                }
                placeholder="Yes"
                name="type"
                required
              />
            </Flex>
            <Flex direction="column" mx={1}>
              <Text mb={1}>SN:</Text>
              <Input
                value={product.sn}
                onChange={(e) => setProduct({ ...product, sn: e.target.value })}
                placeholder="ACD19171972109"
                name="type"
                required
              />
            </Flex>
          </InputGroup>
          <InputGroup my={2}>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Cost:</Text>
              <Input
                value={product.cost}
                onChange={(e) =>
                  setProduct({ ...product, cost: e.target.value })
                }
                placeholder="1009$"
                name="type"
                required
              />
            </Flex>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Cargo:</Text>
              <Input
                value={product.cargo}
                onChange={(e) =>
                  setProduct({ ...product, cargo: e.target.value })
                }
                placeholder="200"
                name="type"
                required
              />
            </Flex>
          </InputGroup>
          <InputGroup my={2}>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Total:</Text>
              <Input
                value={product.total}
                onChange={(e) =>
                  setProduct({ ...product, total: e.target.value })
                }
                placeholder="1209"
                name="type"
                required
              />
            </Flex>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Sell:</Text>
              <Input
                value={product.sell}
                onChange={(e) =>
                  setProduct({ ...product, sell: e.target.value })
                }
                placeholder="1309"
                name="type"
                required
              />
            </Flex>
          </InputGroup>
          <InputGroup my={2}>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Benefit:</Text>
              <Input
                value={product.benefit}
                onChange={(e) =>
                  setProduct({ ...product, benefit: e.target.value })
                }
                placeholder="100"
                name="type"
                required
              />
            </Flex>
            <Flex direction="column" mx={1}>
              <Text mb={1}>Remarks:</Text>
              <Input
                value={product.remarks}
                onChange={(e) =>
                  setProduct({ ...product, remarks: e.target.value })
                }
                placeholder="scratches"
                name="type"
                required
              />
            </Flex>
          </InputGroup>
        </ModalBody>
        <ModalFooter
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button colorScheme="green" onClick={handleAddProduct}>
            Add
          </Button>
          <Button colorScheme="pink" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
