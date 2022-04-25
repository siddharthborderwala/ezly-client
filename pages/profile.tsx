import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Grid,
  Text,
  chakra,
  useToast,
  Spinner,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Heading,
} from '@chakra-ui/react';
import ImageUpload from '../components/ImageUpload';
import ModalContainer from '../components/ModalContainer';
import UpdateSocial from '../components/UpdateSocial';
import Reorder from '../components/Reorder';
import CreateLinkMaker from '../components/CreateLinkMaker';
import { LayoutPage } from '../types/ui';
import Head from 'next/head';
import { Globe } from 'phosphor-react';
import renderHTML, { Body as ProfileBody } from 'ezly-render-html';
import axios from 'axios';
import { useAuth } from '../contexts/auth';
import { withProtection } from '../hoc/with-protection';
import UpdateFont from '../components/UpdateFont';
import { ChevronDownIcon } from '@chakra-ui/icons';
import UpdateBackground from '../components/UpdateBackground';

const defaultBgColor = 'hsla(0, 0%, 100%, 1)';

export type ProfileType = {
  username: string;
  savedVersion: number;
  publishedVersion: number;
  body: ProfileBody;
};

const getDefaultPageData = (username: string): ProfileBody => ({
  meta: {
    background: '',
    image: '',
    username,
    description: '',
    font: '',
  },
  socials: [],
  links: [],
});

const Maker: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [unsaved, setUnsaved] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [pageData, setPageData] = useState<ProfileBody>(
    getDefaultPageData(user!.username)
  );

  const wrappedSetPageData = (
    args: Parameters<React.Dispatch<React.SetStateAction<ProfileBody>>>[0]
  ) => {
    setPageData(args);
    setUnsaved(true);
  };

  const handlePublish = async () => {
    const toastId = toast({
      title: (
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Publishing profile</Text>
          <Spinner />
        </Flex>
      ),
      duration: null,
      status: 'info',
    });

    try {
      await axios.post(`/v1/profile/${user!.username}/publish`);
      toast({
        title: 'Profile published',
        status: 'success',
      });
    } catch (err) {
      toast({
        title: 'Failed to publish profile',
        status: 'error',
      });
    } finally {
      if (toastId) {
        toast.close(toastId);
      }
    }
  };

  const handleOnSave = () => {
    const toastId = toast({
      title: (
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Saving profile</Text>
          <Spinner />
        </Flex>
      ),
      duration: null,
      status: 'info',
    });

    axios
      .patch<{ profile: { body: ProfileBody } }>(
        `/v1/profile/${user!.username}`,
        {
          body: pageData,
        }
      )
      .then((res) => {
        setPageData(res.data.profile.body);
        toast({
          title: 'Profile saved',
          status: 'success',
        });
        setUnsaved(false);
      })
      .catch(() => {
        toast({
          title: 'Failed to save profile',
          status: 'error',
        });
      })
      .finally(() => {
        if (toastId) {
          toast.close(toastId);
        }
      });
  };

  useEffect(() => {
    axios
      .get<{ profile: ProfileType }>(`/v1/profile/${user!.username}`)
      .then((res) => {
        setPageData(res.data.profile.body);
      })
      .catch(() => {
        toast({
          title: 'Failed to load profile',
          status: 'error',
        });
      })
      .finally(() => {
        setProfileLoading(false);
      });
  }, [toast, user]);

  if (profileLoading) {
    return (
      <Center flexDirection="column">
        <Text>Loading Profile</Text>
        <Spinner mt="4" />
      </Center>
    );
  }

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
                mr="auto"
              />
              <Button
                className={unsaved ? 'pulsate' : ''}
                ml="2"
                onClick={handleOnSave}
                disabled={!unsaved}
              >
                {unsaved ? 'Save Changes' : 'Changes Up To Date'}
              </Button>
            </Flex>

            <Flex justifyContent="space-between">
              <Heading fontSize="1.5rem">Customize your profile</Heading>
              <Menu>
                <MenuButton
                  variant="outline"
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  Options
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <ModalContainer unstyled heading="Update Profile Image">
                      {(onClose) => (
                        <ImageUpload
                          onClose={onClose}
                          setPageData={wrappedSetPageData}
                          pageData={pageData}
                        />
                      )}
                    </ModalContainer>
                  </MenuItem>
                  <MenuItem>
                    <ModalContainer unstyled heading="Update/Add Socials">
                      {(onClose) => (
                        <UpdateSocial
                          onClose={onClose}
                          pageData={pageData}
                          setPageData={wrappedSetPageData}
                        />
                      )}
                    </ModalContainer>
                  </MenuItem>
                  <MenuItem>
                    <ModalContainer unstyled heading="Update Font">
                      {(onClose) => (
                        <UpdateFont
                          onClose={onClose}
                          pageData={pageData}
                          setPageData={wrappedSetPageData}
                        />
                      )}
                    </ModalContainer>
                  </MenuItem>
                  <MenuItem>
                    <ModalContainer unstyled heading="Set Background">
                      {(onClose) => (
                        <UpdateBackground
                          onClose={onClose}
                          pageData={pageData}
                          setPageData={wrappedSetPageData}
                        />
                      )}
                    </ModalContainer>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          <Reorder pageData={pageData} setPageData={wrappedSetPageData}>
            <Text fontWeight="bold" fontSize="1.25rem">
              Your links
            </Text>
            <ModalContainer heading="Create Link">
              {(onClose) => (
                <CreateLinkMaker
                  onClose={onClose}
                  setPageData={wrappedSetPageData}
                />
              )}
            </ModalContainer>
          </Reorder>
        </Flex>
        <Flex
          flexDirection="column"
          borderLeft="1px"
          pl="4"
          borderColor="gray.300"
        >
          <Flex alignItems="flex-start" justifyContent="space-between">
            <Text fontSize="1.1rem" fontWeight="bold">
              Preview your changes and publish them
            </Text>
            <Button
              size="sm"
              rightIcon={<Globe weight="bold" />}
              onClick={handlePublish}
              ml="4"
            >
              Publish
            </Button>
          </Flex>
          <chakra.iframe
            border="2px"
            flex="1"
            srcDoc={renderHTML(pageData)}
            mt="12"
            mb="4"
            width="70%"
            maxWidth="375px"
            mx="auto"
            overflow="auto"
            borderRadius="16"
          ></chakra.iframe>
        </Flex>
      </Grid>
    </>
  );
};

const MakerPage = withProtection(Maker) as LayoutPage;

MakerPage.layout = 'dashboard';

export default MakerPage;
