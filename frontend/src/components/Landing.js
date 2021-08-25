import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Landing = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/problems');
  };

  return (
    <Box maxW="2xl" mx="auto" textAlign="center">
      <Heading as="h2" size="3xl">
        Nutcracker
      </Heading>
      <Text mt={4} fontSize="lg">
        Want to test your cipher-cracking skills? Then you&apos;ve come to the
        right place.
      </Text>
      <Button mt={8} size="lg" colorScheme="blue" onClick={handleClick}>
        Start Cracking&nbsp;
        <span role="img" aria-label="peanuts">
          🥜
        </span>
      </Button>
    </Box>
  );
};

export default Landing;
