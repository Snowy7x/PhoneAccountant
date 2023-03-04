import AddProduct from "@/components/AddProduct";
import Confirm from "@/components/Confirm";
import EditProduct from "@/components/EditProduct";
import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Spacer,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function manageProducts() {
  const router = useRouter();
  const { setColorMode } = useColorMode();
  const { currentUser, addProduct, products, editProduct, deleteProduct } =
    useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [toEditProduct, setToEditProduct] = useState(products[0]);
  const [toDelProduct, setToDelProduct] = useState(products[0]);
  const [delete_, setDelete] = useState(false);

  const editDisclosure = useDisclosure();
  const delDisclosure = useDisclosure();
  const toast = useToast();

  const background = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    setColorMode("dark");
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      console.log(currentUser.email);
      if (
        !currentUser.permissions.includes(0) &&
        !currentUser.permissions.includes(1)
      ) {
        router.push("/user");
      }
    }
    // TODO: Check for permission
  }, [currentUser]);

  const handleDeletion = () => {
    setDelete(true);
  };

  useEffect(() => {
    if (delete_) {
      delDisclosure.onOpen();
      setDelete(false);
    }
  }, [delete_]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
      direction="column"
    >
      <Spacer y={1} />
      <Heading textAlign="center">Products Management Window</Heading>
      <Spacer y={1} />
      <TableContainer
        shadow="dark-lg"
        background={background}
        borderRadius={20}
      >
        <Button px={12} variant="solid" colorScheme="blue" onClick={onOpen}>
          Add Product
        </Button>
        <Table variant="simple" size="lg">
          <TableCaption>All Products details</TableCaption>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>COLOR</Th>
              <Th>Water Proof</Th>
              <Th>SN</Th>
              <Th>Cost (UAE)</Th>
              <Th>Cargo</Th>
              <Th>Total cost</Th>
              <Th>Sell</Th>
              <Th>Benefit</Th>
              <Th>Remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.map((product) => (
                <Tr>
                  <Th>{product.type}</Th>
                  <Th>{product.color}</Th>
                  <Th>{product.waterproof}</Th>
                  <Th>{product.SN}</Th>
                  <Th>{product.cost}</Th>
                  <Th>{product.cargo}</Th>
                  <Th>{product.total}</Th>
                  <Th>{product.sell}</Th>
                  <Th>{product.benefit}</Th>
                  <Th>{product.remarks}</Th>
                  <Th>
                    <Button
                      colorScheme="cyan"
                      onClick={() => {
                        setToEditProduct(product);
                        editDisclosure.onOpen();
                      }}
                    >
                      Edit
                    </Button>
                  </Th>
                  <Th>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setToDelProduct(product);
                        handleDeletion();
                      }}
                    >
                      Remove
                    </Button>
                  </Th>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer y={1} />
      <Button colorScheme="red" onClick={() => router.push("/user")}>
        Go back
      </Button>

      <AddProduct
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        AddProduct={addProduct}
      />

      <EditProduct
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        onOpen={editDisclosure.onOpen}
        initialProduct={toEditProduct ? toEditProduct : products[0]}
        EditProduct={editProduct}
      />

      <Confirm
        message="Are you sure you want to delete this product?"
        isOpen={delDisclosure.isOpen}
        onClose={delDisclosure.onClose}
        action={() => {
          deleteProduct(toDelProduct).then(() => {
            toast({
              title: "Deleted the product successfully",
              status: "success",
              isClosable: true,
            });
          });
          delDisclosure.onClose();
        }}
      />
      <Spacer y={1} />
    </Flex>
  );
}
