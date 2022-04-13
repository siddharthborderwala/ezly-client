import { Box, Button, Flex, Spacer, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

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
    <Flex
      padding="4"
      borderBottom="2px"
      borderColor="gray.200"
      alignItems="center"
    >
      <Box>{linkData.url}</Box>
      <Box paddingLeft="4">{linkData.short_url}</Box>
      <Spacer />
      <Button onClick={() => handleAnalytics(linkData.short_url)}>
        Analytics
      </Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Flex>
  );
};

export default LinkItem;
