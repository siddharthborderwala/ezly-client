import axios from 'axios';
import React, { useState } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { IPageData } from '../pages/maker';
import produce from 'immer';

function isValidUrl(_string: string) {
  const matchpattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
}

type CreateLinkMakerProps = {
  setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
  pageData?: IPageData;
};

const CreateLinkMaker: React.FC<CreateLinkMakerProps> = ({ setPageData }) => {
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

      console.log(data);

      // add to json
      setPageData(
        produce((draft) => {
          draft.blocks.push({
            id: nanoid(),
            type: 'link',
            data: {
              name,
              url: data.shortUrl,
            },
          });
        })
      );

      toast({
        status: 'success',
        title: 'Short URL added successfully',
      });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error while adding link. Try again',
      });
    }
  };

  return (
    <div>
      <Input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Input your link here"
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="input name of link here"
      />
      <Button onClick={handleSubmit}>Add Link</Button>
    </div>
  );
};

export default CreateLinkMaker;
