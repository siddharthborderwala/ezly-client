import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Body as ProfileBody } from 'ezly-render-html';
import produce from 'immer';

export type UpdateFontProps = {
  setPageData: React.Dispatch<React.SetStateAction<ProfileBody>>;
  pageData: ProfileBody;
  onClose: () => void;
};

const UpdateFont: React.FC<UpdateFontProps> = ({
  setPageData,
  pageData,
  onClose,
}) => {
  const [font, setFont] = useState(pageData.meta.font);

  const handleSaveFont = () => {
    setPageData(
      produce((draft) => {
        draft.meta.font = font;
      })
    );
    onClose();
  };

  return (
    <>
      <FormControl>
        <FormLabel>Font Name</FormLabel>
        <Input value={font} onChange={(e) => setFont(e.target.value)} />
        <FormHelperText>We support all Google Fonts</FormHelperText>
      </FormControl>
      <Button
        mt="6"
        type="submit"
        position="absolute"
        bottom="4"
        left="8"
        onClick={handleSaveFont}
      >
        Update Font
      </Button>
    </>
  );
};

export default UpdateFont;
