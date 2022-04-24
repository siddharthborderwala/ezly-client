import React, { useState } from 'react';
import axios from 'axios';
import produce from 'immer';
import { nanoid } from 'nanoid';
import { Body as ProfileBody } from 'ezly-render-html';
import { Button, Input } from '@chakra-ui/react';

const getFileExtension = (fileName: string) => {
  const splits = fileName.split('.');
  return splits[splits.length - 1];
};

interface ImageUploadProps {
  setPageData: React.Dispatch<React.SetStateAction<ProfileBody>>;
  pageData?: ProfileBody;
  onClose: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setPageData, onClose }) => {
  const [file, setFile] = useState<File | FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  async function handleSubmission() {
    try {
      if (!file) {
        return;
      }
      setIsLoading(true);

      const extension = getFileExtension((file as any).name);
      const url = await (await axios.get(`/v1/image/${extension}`)).data;

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: file as any,
      });

      const imageUrl = url.split('?')[0];

      setPageData(
        produce((draft) => {
          draft.meta.image = imageUrl;
        })
      );
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }

  return (
    <div>
      <Input pt="1" type="file" name="file" onChange={(e) => handleChange(e)} />
      <Button
        isLoading={isLoading}
        mt="6"
        type="submit"
        position="absolute"
        bottom="4"
        left="8"
        onClick={handleSubmission}
      >
        Submit
      </Button>
    </div>
  );
};

export default ImageUpload;
