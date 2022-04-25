import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import { CaretRight } from 'phosphor-react';

export type OverviewCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  link: string;
};

const OverviewCard: React.FC<OverviewCardProps> = ({
  label,
  value,
  link,
  icon,
}) => (
  <Box
    border="none"
    borderRadius="4"
    flex="1"
    background="gray.100"
    overflow="hidden"
  >
    <Flex alignItems="center" justifyContent="space-between" padding="4">
      <Center
        padding="2"
        border="none"
        borderRadius="8"
        backgroundColor="teal.300"
      >
        {icon}
      </Center>
      <Text fontSize="1.25rem">{value}</Text>
    </Flex>
    <Link href={link} passHref>
      <ChakraLink
        display="flex"
        alignItems="center"
        px="4"
        py="2"
        backgroundColor="gray.300"
      >
        <Heading as="h4" fontSize="1rem" mr="2" textTransform="capitalize">
          {label}
        </Heading>
        <CaretRight weight="bold" />
      </ChakraLink>
    </Link>
  </Box>
);

export default OverviewCard;
