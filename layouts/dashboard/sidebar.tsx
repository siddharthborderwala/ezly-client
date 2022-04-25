import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Tooltip,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import NavLink from '../../components/NavLink';
import {
  CaretLeft,
  CaretRight,
  ChartLineUp,
  CirclesThree,
  Folder,
  SignOut,
  User,
} from 'phosphor-react';
import { useAuth } from '../../contexts/auth';

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  const { pathname } = useRouter();
  const { logout } = useAuth();

  const activeTabName = useMemo(() => pathname.split('/')[1], [pathname]);

  return (
    <Flex
      height="100vh"
      as="nav"
      width={isOpen ? '250px' : 'auto'}
      flexDirection="column"
      padding={isOpen ? '4' : '1rem 0.5rem 0.5rem'}
      background="gray.200"
    >
      <Flex alignItems="center">
        <CirclesThree
          weight="bold"
          size="2rem"
          aria-label="Ezly Links Management"
        />
        {isOpen && (
          <Heading
            as="h1"
            fontSize="2rem"
            textTransform="uppercase"
            fontWeight="black"
            ml="4"
          >
            Ezly
          </Heading>
        )}
      </Flex>
      <Flex
        flexDirection="column"
        experimental_spaceY={isOpen ? '2' : '4'}
        mt="16"
      >
        <NavLink href="/" active={activeTabName === ''}>
          <Tooltip label="Dashboard" hasArrow placement="right">
            <ChartLineUp weight="bold" />
          </Tooltip>
          {isOpen && <Text ml="4">Dashboard</Text>}
        </NavLink>

        <NavLink href="/collections" active={activeTabName === 'collections'}>
          <Tooltip label="Collections" hasArrow placement="right">
            <Folder weight="bold" />
          </Tooltip>
          {isOpen && <Text ml="4">Collections</Text>}
        </NavLink>

        <NavLink href="/profile" active={activeTabName === 'profile'}>
          <Tooltip label="Profile" hasArrow placement="right">
            <User weight="bold" />
          </Tooltip>
          {isOpen && <Text ml="4">Profile</Text>}
        </NavLink>
      </Flex>
      {isOpen ? (
        <>
          <Button
            leftIcon={<CaretLeft weight="bold" />}
            variant="outline"
            mt="auto"
            onClick={onToggle}
          >
            Collapse Sidebar
          </Button>
          <Button onClick={logout} leftIcon={<SignOut weight="bold" />} mt="4">
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Tooltip label="Expand Sidebar" hasArrow placement="right">
            <IconButton
              icon={<CaretRight weight="bold" />}
              variant="outline"
              mt="auto"
              onClick={onToggle}
              aria-label="Expand Sidebar"
              size="sm"
            />
          </Tooltip>
          <Tooltip label="Sign Out" hasArrow placement="right">
            <IconButton
              icon={<SignOut weight="bold" />}
              mt={isOpen ? '4' : '2'}
              aria-label="Sign out"
              size="sm"
              onClick={logout}
            />
          </Tooltip>
        </>
      )}
    </Flex>
  );
};

export default Sidebar;
