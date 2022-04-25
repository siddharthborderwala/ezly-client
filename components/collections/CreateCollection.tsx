import React, { useState } from 'react';
import axios from 'axios';
import { Heading, useToast, Box, Input, Button, Flex } from '@chakra-ui/react';
import { useSWRConfig } from 'swr';

type CreateCollectionProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCollection: React.FC<CreateCollectionProps> = ({ setShow }) => {
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
      setShow(false);
    }
  };

  return (
    <>
      <Heading marginTop="4" fontSize="1.5rem">
        Create Collection
      </Heading>
      <Flex marginTop="1em" marginBottom="1em">
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection name here"
        />
        <Button isDisabled={loading} onClick={handleCreate} marginLeft="1em">
          Create Collection
        </Button>
      </Flex>
    </>
  );
};

export default CreateCollection;
