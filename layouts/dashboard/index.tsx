import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './sidebar';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Flex as="main" height="100vh">
      <Sidebar />
      <Box flexGrow="1" padding="4" overflowY="scroll">
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
