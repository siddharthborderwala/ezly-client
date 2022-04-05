import React from 'react';
import { IPageData, LinkBlock } from '../pages/profile';
import * as R from 'ramda';
import { Box } from '@chakra-ui/react';

import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

type ReorderProps = {
  setPageData: React.Dispatch<React.SetStateAction<IPageData>>;
  pageData: IPageData;
};

type ListItemProps = {
  item: LinkBlock;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};

const ListItem: React.FC<ListItemProps> = ({ item, provided, snapshot }) => {
  return (
    <Box
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </Box>
  );
};

const Reorder: React.FC<ReorderProps> = ({ pageData, setPageData }) => {
  const onDragEnd = (result: any) => {
    console.log('result', result);

    if (!result.destination) {
      return;
    }

    const newData = R.clone(pageData);
    const [removed] = newData.links.splice(result.source.index, 1);
    newData.links.splice(result.destination.index, 0, removed);

    setPageData(newData);
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {pageData.links.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        item={item}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default Reorder;
