import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
} from '@chakra-ui/react';
import produce from 'immer';
import { HslaStringColorPicker } from 'react-colorful';
import { nanoid } from 'nanoid';
import ImageUpload from '../components/ImageUpload';
import ModalContainer from '../components/ModalContainer';
import UpdateSocial from '../components/UpdateSocial';
import Reorder from '../components/Reorder';
import CreateLinkMaker from '../components/CreateLinkMaker';
import { LayoutPage } from '../types/ui';
import Head from 'next/head';
import { Globe } from 'phosphor-react';

export enum SocialPlatforms {
  FACEBOOK = 'facebook',
  INSTGRAMS = 'instagram',
  LINKEDIN = 'linkedin',
  YOUTUBE = 'youtube',
}

export type BackgroundType = 'solid' | 'gradient';

export type SocialBlock = {
  platform: SocialPlatforms;
  url: string;
};

export type LinkBlock = {
  id: string;
  title: string;
  url: string;
};

export interface IPageData {
  meta: {
    username: string;
    image: string;
    background: string;
  } & Record<string, unknown>;
  socials: SocialBlock[];
  links: LinkBlock[];
}

const defaultBgColor = 'hsla(0, 0%, 100%, 1)';

const initialPageData: IPageData = {
  meta: {
    background: defaultBgColor,
    image: 'https://d29fhpw069ctt2.cloudfront.net/icon/image/38760/preview.svg',
    username: 'username',
  },
  socials: [],
  links: [
    {
      id: nanoid(),
      title: 'Example Link Title',
      url: 'https://example.com',
    },
  ],
};

{
  /* <HslaStringColorPicker
            color={pageData.meta.background}
            onChange={(newColor) => {
              setPageData(
                produce((draft) => {
                  if (draft.meta.background) {
                    draft.meta.background = newColor;
                  } else {
                    draft.meta.background = defaultBgColor;
                  }
                })
              );
            }}
          /> */
}

const Maker: LayoutPage = () => {
  const [pageData, setPageData] = useState<IPageData>(initialPageData);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Grid height="full" templateColumns="4fr 3fr">
        <Flex flexDirection="column" paddingRight="4">
          <Flex flexDirection="column" gap="4">
            <Flex alignItems="center" justifyContent="space-between">
              <Avatar
                name={pageData.meta.username}
                src={pageData.meta.image}
                padding="1"
                background="gray.50"
                shadow="md"
              />
              <ModalContainer heading="Update Profile Image">
                <ImageUpload setPageData={setPageData} pageData={pageData} />
              </ModalContainer>
            </Flex>

            <ModalContainer heading="Update/Add Socials">
              <UpdateSocial pageData={pageData} setPageData={setPageData} />
            </ModalContainer>

            <ModalContainer heading="Create Link">
              <CreateLinkMaker setPageData={setPageData} />
            </ModalContainer>
          </Flex>
          <Reorder pageData={pageData} setPageData={setPageData} />
        </Flex>
        <Flex flexDirection="column">
          <Flex alignItems="flex-end" justifyContent="space-between">
            <Text>Preview your changes and publish them</Text>
            <Button size="sm" rightIcon={<Globe weight="bold" />}>
              Publish
            </Button>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
};

Maker.layout = 'dashboard';

export default Maker;
