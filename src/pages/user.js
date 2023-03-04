import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function user() {
  const router = useRouter();
  const { setColorMode } = useColorMode();
  const { currentUser, logout } = useAuth();

  const background = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    setColorMode("dark");
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  if (!currentUser) return null;
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
    >
      {(currentUser.permissions.includes(0) ||
        currentUser.permissions.includes(1)) && (
        <Flex
          direction="column"
          background={background}
          mx={3}
          p={16}
          rounded={6}
          shadow="lg"
          className="mmItem"
          onClick={() => router.push("/manageProducts")}
        >
          <Heading>Manage Products</Heading>
        </Flex>
      )}
      {(currentUser.permissions.includes(0) ||
        currentUser.permissions.includes(2)) && (
        <Flex
          direction="column"
          background={background}
          mx={3}
          p={16}
          shadow="lg"
          className="mmItem"
          rounded={6}
          onClick={() => router.push("/manageMembers")}
        >
          <Heading>Manage Members</Heading>
        </Flex>
      )}

      <Flex
        direction="column"
        background={background}
        mx={3}
        shadow="lg"
        className="mmItem"
        p={16}
        rounded={6}
        onClick={() => router.push("/history")}
      >
        <Heading>Check Logs/History</Heading>
      </Flex>
      {(currentUser.permissions.includes(0) ||
        currentUser.permissions.includes(3)) && (
        <Flex
          direction="column"
          background={background}
          mx={3}
          p={16}
          shadow="lg"
          className="mmItem"
          rounded={6}
          onClick={() => router.push("/addSold")}
        >
          <Heading>Add Sold Item</Heading>
        </Flex>
      )}
      <Flex
        direction="column"
        mx={3}
        p={16}
        shadow="lg"
        className="mmItem"
        rounded={6}
        background="red.600"
        onClick={logout}
      >
        <Heading color="white">Log out</Heading>
      </Flex>
    </Flex>
  );
}
