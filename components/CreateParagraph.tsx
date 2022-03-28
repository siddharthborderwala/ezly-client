import React from 'react';
import { IPageData } from '../pages/maker';
import { Button, Textarea } from '@chakra-ui/react';
import produce from 'immer';
import { nanoid } from 'nanoid';

type CreateParagraphProps = {
  setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
};

const CreateParagraph: React.FC<CreateParagraphProps> = ({ setPageData }) => {
  const [text, setText] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    setPageData(
      produce((draft) => {
        draft.blocks.push({
          id: nanoid(),
          type: 'p',
          data: {
            text,
          },
        });
      })
    );
  };

  return (
    <>
      <Textarea
        value={text}
        onChange={(e) => handleChange(e)}
        placeholder="Add your content here"
        size="sm"
      />

      <Button onClick={handleSubmit}>Add Paragraph</Button>
    </>
  );
};

export default CreateParagraph;
