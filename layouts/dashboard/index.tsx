import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './sidebar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Flex as="main">
      <Sidebar />
      <Box flexGrow="1" padding="4">
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
