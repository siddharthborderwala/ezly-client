import axios from 'axios';
import React, { useState } from 'react';
import {
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import produce from 'immer';
import { Body as ProfileBody } from 'ezly-render-html';

function isValidUrl(_string: string) {
  const matchpattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
}

type CreateLinkMakerProps = {
  setPageData: React.Dispatch<React.SetStateAction<ProfileBody>>;
  pageData?: ProfileBody;
  onClose: () => void;
};

const CreateLinkMaker: React.FC<CreateLinkMakerProps> = ({
  setPageData,
  onClose,
}) => {
  const toast = useToast();

  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    console.log(link);

    if (!isValidUrl(link)) {
      toast({
        status: 'error',
        title: 'Invalid URL',
      });
      return;
    }

    try {
      const { data } = await axios.post('/v1/links', {
        collectionName: 'profile-page',
        url: link,
        isAlias: false,
      });

      // add to json
      setPageData(
        produce((draft) => {
          draft.links.push({
            id: nanoid(),
            title: name,
            url: `http://ezly.tech/${data.shortUrl}`,
          });
        })
      );

      toast({
        status: 'success',
        title: 'Short URL added successfully',
      });
      onClose();
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error while adding link. Try again',
      });
    }
  };

  return (
    <div>
      <FormControl isRequired>
        <FormLabel htmlFor="new-link">URL</FormLabel>
        <Input
          id="new-link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="johndoe.com"
        />
      </FormControl>
      <FormControl isRequired mt="4">
        <FormLabel htmlFor="new-link-name">Link Title</FormLabel>
        <Input
          id="new-link-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe's Portfolio"
        />
      </FormControl>
      <Button
        mt="6"
        type="submit"
        position="absolute"
        bottom="4"
        left="8"
        onClick={handleSubmit}
      >
        Add Link
      </Button>
    </div>
  );
};

export default CreateLinkMaker;
