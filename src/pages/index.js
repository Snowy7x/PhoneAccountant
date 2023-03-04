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

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState(true);

  const { setColorMode } = useColorMode();

  const { login, currentUser } = useAuth();

  const background = useColorModeValue("gray.100", "gray.900");
  useEffect(() => {
    if (currentUser) {
      router.push("/user");
    }
  }, [currentUser]);
  useEffect(() => {
    setColorMode("dark");
  }, []);

  const handleLogin = () => {
    setCanLogin(false);
    login(email, password)
      .then((re) => {
        console.log(re.message);
        if (re.user != null && re.code === 200) {
          router.push("/user");
        } else {
          setCanLogin(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setCanLogin(false);
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={background} p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@example.com"
          variant="filled"
          mb={3}
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          variant="filled"
          mb={6}
          type="password"
        />
        <Button
          disabled={!canLogin}
          colorScheme="cyan"
          mb={3}
          onClick={handleLogin}
        >
          Log in
        </Button>
        <Text color="yellow.500">
          In case you forgot your password, please contact any of the admins
        </Text>
      </Flex>
    </Flex>
  );
}
