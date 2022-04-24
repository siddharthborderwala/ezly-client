import React from 'react';
import * as R from 'ramda';
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Link,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { Body as ProfileBody, LinkBlock } from 'ezly-render-html';
import { ArrowSquareOut } from 'phosphor-react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { mutate } from 'swr';
import produce from 'immer';

type ReorderProps = {
  setPageData: React.Dispatch<React.SetStateAction<ProfileBody>>;
  pageData: ProfileBody;
};

type ListItemProps = {
  item: LinkBlock;
  provided: DraggableProvided;
  deleteLink: (id: string) => void;
};

const ListItem: React.FC<ListItemProps> = ({ item, provided, deleteLink }) => {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await axios({
        method: 'delete',
        url: `/v1/links`,
        data: {
          short_url: item.url.split('/').pop(),
        },
      });

      await mutate(`/v1/collections/profile-page`);

      deleteLink(item.id);

      toast({
        title: 'link deleted successfully',
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'link could not be deleted',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      border="1px"
      borderColor="gray.200"
      borderRadius="4"
      shadow="md"
      mt="4"
      padding="4"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
    >
      <Box>
        <Text fontWeight="bold">{item.title}</Text>
        <Text>{item.url}</Text>
      </Box>
      <ButtonGroup isAttached variant="outline">
        <Tooltip label="Visit link">
          <IconButton
            aria-label="Visit link"
            icon={<ArrowSquareOut weight="bold" />}
            as={Link}
            target="_blank"
            href={item.url}
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
          />
        </Tooltip>
        <Tooltip label="Delete link">
          <IconButton
            aria-label="Delete link"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
          />
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
};

const Reorder: React.FC<ReorderProps> = ({
  pageData,
  setPageData,
  children,
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newData = R.clone(pageData);
    const [removed] = newData.links.splice(result.source.index, 1);
    newData.links.splice(result.destination.index, 0, removed);

    setPageData(newData);
  };

  const handleDelete = (id: string) => {
    setPageData(
      produce((draft) => {
        draft.links = draft.links.filter((l) => id !== l.id);
      })
    );
  };

  return (
    <Flex flexDirection="column" flex="1" mt="6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <Box
                padding="4"
                border="1px"
                borderColor="gray.300"
                borderRadius="4"
                backgroundColor="gray.50"
                flex="1"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Flex justifyContent="space-between">{children}</Flex>
                {pageData.links.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        item={item}
                        provided={provided}
                        deleteLink={handleDelete}
                      />
                    )}
                  </Draggable>
                ))}
              </Box>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

export default Reorder;
