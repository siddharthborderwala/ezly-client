import { Button, Td, Tr, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
      <Td paddingLeft="4">{linkData.short_url}</Td>
      <Td>
        <Button onClick={() => handleAnalytics(linkData.short_url)}>
          Analytics
        </Button>
      </Td>

      <Td>
        <Button onClick={handleDelete}>Delete</Button>
      </Td>
    </Tr>
  );
};

export default LinkItem;
