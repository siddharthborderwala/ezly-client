import {
  useToast,
  Heading,
  Input,
  Checkbox,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import validator from 'validator';

type CreateLink = {
  collectionName: string;
};

const CreateLink: React.FC<CreateLink> = ({ collectionName }) => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [isAlias, setIsAlias] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { mutate } = useSWRConfig();

  const handleCreateLink = async () => {
    setLoading(true);

    if (!validator.isURL(url)) {
      toast({
        title: 'invalid url',
        status: 'error',
        description: 'type a valid url',
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (isAlias) {
      if (!validator.isAlphanumeric(alias)) {
        toast({
          title: 'invalid alias',
          status: 'error',
          description: 'only alpha numeric characterics allowed as the alias',
          isClosable: true,
        });
        setLoading(false);
        return;
      }
    }

    try {
      const res = await axios.post(`v1/links/`, {
        alias,
        url,
        collectionName,
        isAlias,
      });

      await mutate(`/v1/collections/${collectionName}`);

      toast({
        title: 'link created successfully',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'error occured while creating link',
        status: 'error',
        description: (err as any).response.data.message,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box margin="2">
      <Heading size="lg" marginTop="4" marginBottom="2">
        Create Link
      </Heading>

      <Input placeholder="link here" onChange={(e) => setUrl(e.target.value)} />

      <Flex marginBottom="2" marginTop="2" alignItems="center">
        <Checkbox
          isChecked={isAlias}
          onChange={(e) => setIsAlias(e.target.checked)}
          display="block"
          width="150px"
        >
          Set Alias?
        </Checkbox>
        <Input
          placeholder="alias here"
          isDisabled={!isAlias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </Flex>

      <Button
        disabled={loading}
        onClick={(e) => handleCreateLink()}
        width="100%"
      >
        Create Link
      </Button>
    </Box>
  );
};

export default CreateLink;
