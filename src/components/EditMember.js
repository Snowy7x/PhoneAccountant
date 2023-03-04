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
import { useEffect, useState } from "react";

export default function EditMember({
  isOpen,
  onOpen,
  onClose,
  EditMember,
  initialMember = {},
}) {
  const [member, setMember] = useState(initialMember);
  const [oldMember, setOldMember] = useState(initialMember);

  useEffect(() => {
    setOldMember(initialMember);
    setMember(initialMember);
    setCheckedItems([
      initialMember.permissions?.includes(1) ||
        initialMember.permissions?.includes(0),
      initialMember.permissions?.includes(2) ||
        initialMember.permissions?.includes(0),
      initialMember.permissions?.includes(3) ||
        initialMember.permissions?.includes(0),
    ]);
  }, [initialMember]);

  const toast = useToast();
  const [checkedItems, setCheckedItems] = useState([
    initialMember.permissions?.includes(1) ||
      initialMember.permissions?.includes(0),
    initialMember.permissions?.includes(2) ||
      initialMember.permissions?.includes(0),
    initialMember.permissions?.includes(3) ||
      initialMember.permissions?.includes(0),
  ]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const handleEditMember = () => {
    if (member.length <= 4) {
      return toast({
        title: `Fill all the fields`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: `Updating the member`,
        status: "info",
        isClosable: true,
      });

      if (!EditMember)
        return toast({
          title: `Error: refresh the page please`,
          status: "error",
          isClosable: true,
        });
      if (allChecked) member.permissions = [0];
      else
        member.permissions = checkedItems
          .map((v, i) => (v ? i + 1 : -1))
          .filter((i) => i != -1);
      EditMember(initialMember, member)
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
        <ModalHeader>Update member - {member.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="yellow" mb={6}>
            Please fill out these fields
          </Text>
          <Text mb={1}>Name:</Text>
          <Input
            value={member.name}
            onChange={(e) => setMember({ ...member, name: e.target.value })}
            placeholder="type"
            name="type"
            required
            mb={2}
          />
          <Text mb={1}>Email:</Text>
          <Input
            value={member.email}
            onChange={(e) => setMember({ ...member, email: e.target.value })}
            placeholder="type"
            name="type"
            required
            mb={2}
          />
          <Text mb={1}>New Password:</Text>
          <Input
            value={member.password}
            onChange={(e) => setMember({ ...member, password: e.target.value })}
            placeholder="type"
            name="type"
            required
            mb={6}
          />
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            mb={3}
            onChange={(e) =>
              setCheckedItems([
                e.target.checked,
                e.target.checked,
                e.target.checked,
              ])
            }
          >
            Is Admin?
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            <Checkbox
              isChecked={checkedItems[0]}
              onChange={(e) =>
                setCheckedItems([
                  e.target.checked,
                  checkedItems[1],
                  checkedItems[2],
                ])
              }
            >
              Can Manage Products? [Add/remove/update]
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([
                  checkedItems[0],
                  e.target.checked,
                  checkedItems[2],
                ])
              }
            >
              Can Manage Members? [Add/remove/update]
            </Checkbox>
            <Checkbox
              isChecked={checkedItems[2]}
              onChange={(e) =>
                setCheckedItems([
                  checkedItems[0],
                  checkedItems[1],
                  e.target.checked,
                ])
              }
            >
              Can Sell?
            </Checkbox>
          </Stack>
        </ModalBody>
        <ModalFooter
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button colorScheme="green" onClick={handleEditMember}>
            Update
          </Button>
          <Button colorScheme="pink" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
