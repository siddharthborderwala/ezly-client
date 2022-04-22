import {
  Heading,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';

import IconBox from '../icons/IconBox';

import React, { ReactNode } from 'react';

const Card: React.FC<{ title: string; data: string; icon: ReactNode }> = (
  props
) => {
  const iconTeal = useColorModeValue('teal.400', 'teal.400');
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Box p={6}>
          <Flex>
            <Box>
              <Stack spacing={0} align={'center'} mb={5}>
                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                  {props.title}
                </Heading>
              </Stack>
              <Stack spacing={0}>
                <Text fontWeight={600} fontSize={'xl'}>
                  {props.data}
                </Text>
              </Stack>
            </Box>
            <Spacer />
            <Center alignContent={'center'}>
              <IconBox as="box" h={'45px'} w={'45px'} bg={iconTeal}>
                {props.icon}
              </IconBox>
            </Center>
          </Flex>
        </Box>
      </Box>
    </Center>
  );
};

export default Card;
