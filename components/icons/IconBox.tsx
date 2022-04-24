import React from 'react';
import { Flex } from '@chakra-ui/react';

const IconBox: React.FC<{ as: string; h: string; w: string; bg: string }> = (
  props
) => {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      borderRadius={'12px'}
      height={props.h}
      width={props.w}
      backgroundColor={props.bg}
    >
      {children}
    </Flex>
  );
};

export default IconBox;
