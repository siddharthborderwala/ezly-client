import React, { useState } from 'react';
import axios from 'axios';
import { IPageData } from '../pages/profile';
import produce from 'immer';
import { nanoid } from 'nanoid';

const getFileExtension = (fileName: string) => {
  const splits = fileName.split('.');
  return splits[splits.length - 1];
};

interface ImageUploadProps {
  setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
  pageData?: IPageData;
}

const ImageUpload = ({ setPageData }: ImageUploadProps) => {
  const [file, setFile] = useState<File | FileList | null>(null);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  async function handleSubmission() {
    try {
      if (!file) {
        return;
      }

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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <input type="file" name="file" onChange={(e) => handleChange(e)} />
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
};

export default ImageUpload;
