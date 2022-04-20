import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '../card/Card';
import CardBody from '../card/CradBody';
import IconBox from '../icons/IconBox';
import React, { ReactNode } from 'react';

const MiniStatistics: React.FC<{
  title: string;
  amount: string;
  icon: ReactNode;
}> = ({ title, amount, icon }) => {
  const iconTeal = useColorModeValue('teal.300', 'teal.300');
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card minH="83px">
      <CardBody>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat me="auto">
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize="lg" color={textColor}>
                {amount}
              </StatNumber>
            </Flex>
          </Stat>
          <IconBox as="box" h={'45px'} w={'45px'} bg={iconTeal}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
