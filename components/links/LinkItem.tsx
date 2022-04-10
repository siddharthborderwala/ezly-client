import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import axios from 'axios';
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
  console.log(linkData);

  const handleDelete = async () => {
    await axios.delete(`/v1/links`);
    await mutate(`/v1/collections/${collectionName}`);
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
      <Button onClick={handleDelete}>Delete</Button>
    </Flex>
  );
};

export default LinkItem;
