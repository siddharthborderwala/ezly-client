import { Box, useStyleConfig } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const Card: React.FC<{ variant?: any; children: ReactNode; minH: string }> = (
  props
) => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
