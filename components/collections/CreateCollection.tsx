import React, { useState } from 'react';
import axios from 'axios';
import { Heading, useToast, Box, Input, Button } from '@chakra-ui/react';
import { useSWRConfig } from 'swr';

const CreateCollection: React.FC = () => {
  const [name, setName] = useState('');

  const toast = useToast();

  const { mutate } = useSWRConfig();

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (name.length <= 3) {
      return;
    }

    setLoading(true);
    try {
      await axios.post(`v1/collections`, {
        name,
      });

      await mutate('/v1/collections/all');
      toast({
        status: 'success',
        title: 'collection created successfully',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'error while creating collection',
        description: 'try again later',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading marginTop="4" size="lg">
        Create Collection
      </Heading>
      <Box>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="collection name here"
        />

        <Button isDisabled={loading} onClick={handleCreate}>
          Create Collection
        </Button>
      </Box>
    </>
  );
};

export default CreateCollection;
