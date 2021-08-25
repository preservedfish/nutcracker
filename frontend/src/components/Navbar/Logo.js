import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';

const Logo = () => (
  <Box>
    <Link as={RouterLink} to="/" fontSize="lg" fontWeight="bold">
      Nutcracker
    </Link>
  </Box>
);

export default Logo;
