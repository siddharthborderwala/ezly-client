import { useToast, Heading, Input, Checkbox, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

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

    if (url.length == 0) {
      setLoading(false);
      return;
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
    <>
      <Heading size="lg" marginTop="4">
        Create Link
      </Heading>

      <Input placeholder="link here" onChange={(e) => setUrl(e.target.value)} />

      <Checkbox
        isChecked={isAlias}
        onChange={(e) => setIsAlias(e.target.checked)}
      >
        Set Alias?
      </Checkbox>
      <Input
        placeholder="alias here"
        isDisabled={!isAlias}
        onChange={(e) => setAlias(e.target.value)}
      />

      <Button disabled={loading} onClick={(e) => handleCreateLink()}>
        Create Link
      </Button>
    </>
  );
};

export default CreateLink;
