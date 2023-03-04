import AddMember from "@/components/AddMember";
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
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function manageMembers() {
  const router = useRouter();
  const toast = useToast();

  const { setColorMode } = useColorMode();
  const { currentUser, addMember, members, editMember, deleteMember } =
    useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [toEditMember, setToEditMember] = useState(members[0]);
  const [toDelMember, setToDelMember] = useState(members[0]);
  const [delete_, setDelete] = useState(false);

  const editDisclosure = useDisclosure();
  const delDisclosure = useDisclosure();

  const background = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    setColorMode("dark");
  }, []);

  useEffect(() => {
    console.log("got it", toEditMember);
  }, [toEditMember]);

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
      console.log("deleted", toDelMember);
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
      <Heading textAlign="center">Members Management Window</Heading>
      <Spacer y={1} />
      <TableContainer
        shadow="dark-lg"
        background={background}
        borderRadius={20}
      >
        <Button px={12} variant="solid" colorScheme="blue" onClick={onOpen}>
          Add Member
        </Button>
        <Table variant="simple" size="lg">
          <TableCaption>All Members details</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Since</Th>
              <Th>Is Admin?</Th>
              <Th>Can Manage Users?</Th>
              <Th>Can Manage Products?</Th>
              <Th>Can Sell?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members &&
              members.map((member) => (
                <Tr
                  background={member.permissions.includes(0) ? "green.700" : ""}
                >
                  <Th>{member.name}</Th>
                  <Th>{member.email}</Th>
                  <Th>
                    {new Date(member.since)
                      .toISOString()
                      .replace(/T/, " at ")
                      .replace(/\..+/, "")}
                  </Th>
                  <Th>{member.permissions.includes(0).toString()}</Th>
                  <Th>
                    {(
                      member.permissions.includes(0) ||
                      member.permissions.includes(2)
                    ).toString()}
                  </Th>
                  <Th>
                    {(
                      member.permissions.includes(0) ||
                      member.permissions.includes(1)
                    ).toString()}
                  </Th>
                  <Th>
                    {(
                      member.permissions.includes(0) ||
                      member.permissions.includes(3)
                    ).toString()}
                  </Th>
                  <Th>
                    <Button
                      colorScheme="cyan"
                      onClick={() => {
                        setToEditMember(member);
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
                        setToDelMember(member);
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
      <Button
        colorScheme="red"
        onClick={() => {
          router.push("/user");
        }}
      >
        Go back
      </Button>
      <AddMember
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        AddMember={addMember}
      />
      <EditMember
        isOpen={editDisclosure.isOpen}
        onClose={editDisclosure.onClose}
        onOpen={editDisclosure.onOpen}
        initialMember={
          toEditMember && toEditMember.hasOwnProperty("email")
            ? toEditMember
            : members[0]
        }
        EditMember={editMember}
      />
      <Confirm
        message="Are you sure you want to delete this member?"
        isOpen={delDisclosure.isOpen}
        onClose={delDisclosure.onClose}
        action={() => {
          deleteMember(toDelMember).then(() => {
            toast({
              title: "Deleted the member successfully",
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
