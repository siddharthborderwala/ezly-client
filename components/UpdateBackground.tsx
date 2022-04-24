import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Body as ProfileBody } from 'ezly-render-html';
import produce from 'immer';
import { HslaStringColorPicker } from 'react-colorful';

export type UpdateBackgroundProps = {
  setPageData: React.Dispatch<React.SetStateAction<ProfileBody>>;
  pageData: ProfileBody;
  onClose: () => void;
};

const UpdateBackground: React.FC<UpdateBackgroundProps> = ({
  setPageData,
  pageData,
  onClose,
}) => {
  const [bg, setBg] = useState(pageData.meta.background);

  const handleBgSet = () => {
    setPageData(
      produce((draft) => {
        draft.meta.background = bg;
      })
    );
    onClose();
  };

  return (
    <>
      <Center mt="4">
        <HslaStringColorPicker color={bg} onChange={setBg} />
      </Center>
      <Button
        mt="6"
        type="submit"
        position="absolute"
        bottom="4"
        left="8"
        onClick={handleBgSet}
      >
        Set Background
      </Button>
    </>
  );
};

export default UpdateBackground;
