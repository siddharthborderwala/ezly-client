import {
  Button,
  FormControl,
  FormLabel,
  Input,
  chakra,
} from '@chakra-ui/react';
import React from 'react';
import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  YoutubeLogo,
} from 'phosphor-react';
import {
  Body as ProfileBody,
  SocialBlock,
  SocialPlatforms,
} from 'ezly-render-html';
import produce from 'immer';

type UpdateSocialProps = {
  setPageData: React.Dispatch<React.SetStateAction<ProfileBody>>;
  pageData: ProfileBody;
  onClose: () => void;
};

const UpdateSocial: React.FC<UpdateSocialProps> = ({
  setPageData,
  pageData,
  onClose,
}) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.persist();
    const data: SocialBlock[] = [];
    new FormData(e.currentTarget).forEach((v, k) => {
      let url = v.toString().trim();
      if (url) {
        data.push({ platform: k as SocialPlatforms, url: v.toString() });
      }
    });
    setSubmitting(true);
    setPageData(
      produce((draft) => {
        draft.socials = data;
      })
    );
    setSubmitting(false);
    onClose();
  };

  return (
    <chakra.form onSubmit={onSubmit}>
      <FormControl display="flex" alignItems="center" mt="2">
        <FormLabel htmlFor="facebook" mr="2">
          <FacebookLogo height="32" width="32" weight="fill" />
        </FormLabel>
        <Input
          defaultValue={
            pageData.socials.find((a) => a.platform === 'facebook')?.url ?? ''
          }
          name="facebook"
          id="facebook"
          type="url"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt="2">
        <FormLabel htmlFor="instagram" mr="2">
          <InstagramLogo height="32" width="32" weight="fill" />
        </FormLabel>
        <Input
          defaultValue={
            pageData.socials.find((a) => a.platform === 'instagram')?.url ?? ''
          }
          name="instagram"
          id="instagram"
          type="url"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt="2">
        <FormLabel htmlFor="twitter" mr="2">
          <TwitterLogo height="32" width="32" weight="fill" />
        </FormLabel>
        <Input
          defaultValue={
            pageData.socials.find((a) => a.platform === 'twitter')?.url ?? ''
          }
          name="twitter"
          id="twitter"
          type="url"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt="2">
        <FormLabel htmlFor="youtube" mr="2">
          <YoutubeLogo height="32" width="32" weight="fill" />
        </FormLabel>
        <Input
          defaultValue={
            pageData.socials.find((a) => a.platform === 'youtube')?.url ?? ''
          }
          name="youtube"
          id="youtube"
          type="url"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt="2">
        <FormLabel htmlFor="linkedin" mr="2">
          <LinkedinLogo height="32" width="32" weight="fill" />
        </FormLabel>
        <Input
          defaultValue={
            pageData.socials.find((a) => a.platform === 'linkedin')?.url ?? ''
          }
          name="linkedin"
          id="linkedin"
          type="url"
        />
      </FormControl>

      <FormControl display="flex" alignItems="center" mt="2">
        <FormLabel htmlFor="github" mr="2">
          <GithubLogo height="32" width="32" weight="fill" />
        </FormLabel>
        <Input
          defaultValue={
            pageData.socials.find((a) => a.platform === 'github')?.url ?? ''
          }
          name="github"
          id="github"
          type="url"
        />
      </FormControl>

      <Button
        isLoading={submitting}
        mt="6"
        type="submit"
        position="absolute"
        bottom="4"
        left="8"
      >
        Save
      </Button>
    </chakra.form>
  );
};

export default UpdateSocial;
