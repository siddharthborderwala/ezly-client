import {
  Button,
  IconButton,
  Td,
  Tooltip,
  Tr,
  useToast,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowSquareOut, Trash } from 'phosphor-react';
import React from 'react';
import { mutate } from 'swr';

type LinkItemProps = {
  id: string;
  linkData: any;
  collectionName: string;
};

const LinkItem: React.FC<LinkItemProps> = ({
  id,
  linkData,
  collectionName,
}) => {
  const toast = useToast();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios({
        method: 'delete',
        url: `/v1/links`,
        data: {
          linkId: id,
        },
      });

      await mutate(`/v1/collections/${collectionName}`);

      toast({
        title: 'link deleted successfully',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'link could not be deleted',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleAnalytics = (alias: string) => {
    router.push(`${collectionName}/analytics/${alias}`);
  };

  return (
    <Tr>
      <Td>{linkData.url}</Td>
      <Td paddingLeft="4">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://ezly.tech/${linkData.short_url}`}
        >
          https://ezly.tech/{linkData.short_url}
        </Link>
      </Td>
      <Td>
        <Tooltip label="View Analytics">
          <IconButton
            icon={<ArrowSquareOut weight="bold" />}
            variant="outline"
            onClick={() => handleAnalytics(linkData.short_url)}
            aria-label="View analytics"
          >
            Analytics
          </IconButton>
        </Tooltip>
      </Td>

      <Td>
        <Tooltip label="Delete Link">
          <IconButton
            icon={<Trash weight="bold" />}
            aria-label="Delete link"
            colorScheme="red"
            onClick={handleDelete}
          />
        </Tooltip>
      </Td>
    </Tr>
  );
};

export default LinkItem;
