import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid } from '@chakra-ui/react';
import produce from 'immer';
import { HslaStringColorPicker } from 'react-colorful';
import ImageUpload from '../components/ImageUpload';
import { nanoid } from 'nanoid';
import ModalContainer from '../components/ModalContainer';
import CreateParagraph from '../components/CreateParagraph';
import ReactDOMServer from 'react-dom/server';
import UpdateSocial from '../components/UpdateSocial';

type SocialName = 'instagram' | 'youtube' | 'facebook' | 'linkedin';

export interface IPageData {
  meta: [
    {
      type: string;
      data: {
        color?: string;
        url?: string;
      };
      id: string;
    }
  ];
  blocks: {
    type: string;
    id: string;
    data: {
      text?: string;
      url?: string;
      // TODO Fix this later
      platforms?: any;
    };
  }[];
}

const initialPageData: IPageData = {
  meta: [
    {
      type: 'backgroundColor',
      data: {
        color: 'hsla(0, 0%, 100%, 1)',
      },
      id: nanoid(),
    },
  ],
  blocks: [
    {
      id: nanoid(),
      data: {
        text: 'Sample paragraph',
      },
      type: 'p',
    },
    {
      id: nanoid(),
      type: 'social',
      data: {
        platforms: [
          {
            platform: 'facebook',
            url: 'fb.com',
          },
        ],
      },
    },
  ],
};

const Maker: React.FC = () => {
  const [pageData, setPageData] = useState<IPageData>(initialPageData);

  const getBackgroundColor = () => {
    const item = pageData.meta.find((item) => item.type === 'backgroundColor');
    if (item) {
      return item.data.color as string;
    }
    return 'hsla(0, 0%, 100%, 1)';
  };

  //   useEffect(() => {
  //     const x = ReactDOMServer.renderToStaticMarkup(
  //       <ModalContainer heading="hello" />
  //     );

  //     console.log(x);
  //   }, []);

  return (
    <Grid minH="100vh" templateColumns="repeat(3,1fr)">
      <Box bg="whitesmoke">
        <Flex flexDirection="column" gap="4">
          <HslaStringColorPicker
            color={getBackgroundColor()}
            onChange={(newColor) => {
              setPageData(
                produce((draft) => {
                  const prop = draft.meta.find(
                    (item) => item.type === 'backgroundColor'
                  );

                  if (prop) {
                    prop!.data.color = newColor;
                  } else {
                    draft.meta.push({
                      type: 'backgroundColor',
                      data: {
                        color: 'hsla(0, 0%, 100%, 1)',
                      },
                      id: nanoid(),
                    });
                  }
                })
              );
            }}
          />

          <ModalContainer heading="Image Upload">
            <ImageUpload setPageData={setPageData} pageData={pageData} />
          </ModalContainer>

          <ModalContainer heading="Create Paragraph">
            <CreateParagraph setPageData={setPageData} />
          </ModalContainer>

          <ModalContainer heading="Update/Add Socials">
            <UpdateSocial pageData={pageData} setPageData={setPageData} />
          </ModalContainer>
        </Flex>
      </Box>
      <Box bg="papayawhip">Reorder</Box>
      <Box bg="whatsapp.100">
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </Box>
    </Grid>
  );
};

export default Maker;
