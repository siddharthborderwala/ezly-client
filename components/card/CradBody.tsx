import { Box, useStyleConfig } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const CardBody: React.FC<{ variant?: any; children: ReactNode }> = (props) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('CardBody', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardBody;
