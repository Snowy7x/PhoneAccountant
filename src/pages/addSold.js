import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function user() {
  const router = useRouter();
  const { setColorMode } = useColorMode();
  const { currentUser, logout, products, addSoldItem } = useAuth();

  const background = useColorModeValue("gray.100", "gray.900");

  const [productId, setProductId] = useState("");
  const [soldFor, setSoldFor] = useState("");
  const [taken, setTaken] = useState("");
  const [amount, setAmount] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setColorMode("dark");
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const handleSell = async () => {
    setCanSubmit(false);
    if (productId.length < 2 || soldFor.length < 1 || taken.length < 1)
      return toast({
        title: `Fill all the fields`,
        status: "error",
        isClosable: true,
      });
    const res = await addSoldItem({ productId, soldFor, taken, amount });
    return toast({
      title: res.message,
      status: res.code === 200 ? "success" : "error",
      isClosable: true,
    });
  };

  if (!currentUser) return null;
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
      flexDirection="column"
    >
      <Spacer y={1} />
      <Spacer y={1} />

      <Flex
        direction="column"
        background={background}
        mx={3}
        p={16}
        rounded={6}
        shadow="lg"
      >
        <Text>Select the product: </Text>
        {products && products.length > 0 ? (
          <Select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            defaultValue={products[0]}
            placeholder="Select a product"
          >
            {products.map((product) => (
              <option value={product._id}>{product.type}</option>
            ))}
          </Select>
        ) : (
          <Select placeholder="No Products/Loading..." />
        )}
        <Text mt={6}>Sold for: </Text>
        <Input
          value={soldFor}
          onChange={(e) => setSoldFor(e.target.value)}
          placeholder="1000"
        />
        <Text mt={6}>You took: </Text>
        <Input
          value={taken}
          onChange={(e) => setTaken(e.target.value)}
          placeholder="100"
        />
        <Text mt={6}>Amount: </Text>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1"
        />
        <Button
          disabled={!canSubmit}
          onClick={handleSell}
          mt={9}
          colorScheme="green"
        >
          Submit
        </Button>
      </Flex>
      <Spacer y={1} />
      <Button colorScheme="red" onClick={() => router.push("/user")}>
        Go back
      </Button>
      <Spacer />
    </Flex>
  );
}
