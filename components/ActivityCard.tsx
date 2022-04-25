import {
  Box,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  Divider,
  IconButton,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowSquareOut, CaretRight, ClipboardText } from 'phosphor-react';

export type ActivityCardProps = {
  label: string;
  link: {
    id: string;
    url: string;
    collection: string;
  } | null;
  url: string;
};

const ActivityCard: React.FC<ActivityCardProps> = ({ label, url, link }) => {
  const { onCopy } = useClipboard(link?.url ?? '');

  return (
    <Box
      border="none"
      borderRadius="4"
      flex="1"
      background="gray.100"
      overflow="hidden"
    >
      <Box padding="4" border="none" borderRadius="8">
        <Text fontWeight="bold">{label}</Text>
        <Divider mt="2" mb="4" borderColor="gray.300" />
        <Flex justifyContent="space-between" alignItems="center">
          <Link href={`/collections/${link?.collection}`} passHref>
            <ChakraLink color="teal.500">{link?.url ?? ''}</ChakraLink>
          </Link>
          <Tooltip label="Copy Link">
            <IconButton
              size="sm"
              variant="outline"
              icon={<ClipboardText weight="bold" />}
              aria-label="Copy Link"
              onClick={onCopy}
            />
          </Tooltip>
        </Flex>
      </Box>
      <Link href={url} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          px="4"
          py="2"
          backgroundColor="gray.300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Heading as="h4" fontSize="1rem" mr="2" textTransform="capitalize">
            View Link
          </Heading>
          <ArrowSquareOut weight="bold" />
        </ChakraLink>
      </Link>
    </Box>
  );
};

export default ActivityCard;
