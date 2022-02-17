import React, { useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import produce from 'immer';
import { HslaStringColorPicker } from 'react-colorful';
import ImageUpload from '../components/ImageUpload';
import { nanoid } from 'nanoid';

export interface IPageData {
  meta: {
    backgroundColor: string;
  };
  blocks: {
    type: string;
    id: string;
    data: {
      text?: string;
      url?: string;
    };
  }[];
}

const initialPageData = {
  meta: {
    backgroundColor: 'hsla(0, 0%, 100%, 1)',
  },
  blocks: [
    {
      id: nanoid(),
      data: {
        text: 'Sample paragraph',
      },
      type: 'p',
    },
  ],
};

const Maker: React.FC = () => {
  const [pageData, setPageData] = useState<IPageData>(initialPageData);

  return (
    <Grid minH="100vh" templateColumns="repeat(3,1fr)">
      <Box bg="whitesmoke">
        <HslaStringColorPicker
          color={pageData.meta.backgroundColor}
          onChange={(newColor) => {
            setPageData(
              produce((draft) => {
                draft.meta.backgroundColor = newColor;
              })
            );
          }}
        />

        <ImageUpload setPageData={setPageData} pageData={pageData} />
      </Box>
      <Box bg="papayawhip">Reorder</Box>
      <Box bg="whatsapp.100">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </Box>
    </Grid>
  );
};

export default Maker;
