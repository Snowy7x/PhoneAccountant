import AddMember from "@/components/AddMember";
import AddProduct from "@/components/AddProduct";
import Confirm from "@/components/Confirm";
import EditMember from "@/components/EditMember";
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
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function manageMembers() {
  const router = useRouter();
  const { setColorMode } = useColorMode();
  const { currentUser, soldItems, refreshSoldItems } = useAuth();

  const background = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    setColorMode("dark");
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      //console.log(currentUser.email);
      /* if (
        !currentUser.permissions.includes(0)
         &&!currentUser.permissions.includes(4)
      ) {
        router.push("/user");
      } */
      refreshSoldItems();
    }
    // TODO: Check for permission
  }, [currentUser]);

  useEffect(() => console.log(soldItems), [soldItems]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
      direction="column"
    >
      <Spacer y={1} />
      <Heading textAlign="center">Logs / History</Heading>
      <Spacer y={1} />
      <TableContainer
        shadow="dark-lg"
        background={background}
        borderRadius={20}
      >
        <Button
          px={12}
          variant="solid"
          colorScheme="blue"
          onClick={refreshSoldItems}
        >
          Refresh
        </Button>
        <Table variant="simple" size="md">
          <TableCaption>All sold products</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Type</Th>
              <Th>SN</Th>
              <Th>Seller Name</Th>
              <Th>Seller Email</Th>
              <Th>Amount</Th>
              <Th>Registered At</Th>
              <Th>Original Price[per one]</Th>
              <Th>Original Price[for all]</Th>
              <Th>Sold For</Th>
              <Th>Seller took</Th>
            </Tr>
          </Thead>
          <Tbody>
            {soldItems &&
              soldItems.map((item) => (
                <Tr>
                  <Th>{item.productId}</Th>
                  <Th>{item.name}</Th>
                  <Th>{item.SN}</Th>
                  <Th>{item.sellerName}</Th>
                  <Th>{item.sellerEmail}</Th>
                  <Th>{item.amount}</Th>
                  <Th>
                    {new Date(item.soldAt)
                      .toISOString()
                      .replace(/T/, " at ")
                      .replace(/\..+/, "")}
                  </Th>
                  <Th>{item.originalPrice}</Th>
                  <Th>{item.originalPrice * item.amount}</Th>
                  <Th>{item.soldFor}</Th>
                  <Th>{item.sellerBenefits}</Th>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Spacer y={1} />
      <Button
        colorScheme="red"
        onClick={() => {
          router.push("/user");
        }}
      >
        Go back
      </Button>
      <Spacer y={1} />
    </Flex>
  );
}
