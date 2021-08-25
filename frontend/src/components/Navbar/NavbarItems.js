/* eslint-disable react/prop-types */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Link } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const NavbarItems = ({ loginModal }) => (
  <Stack spacing={8} align="center" justify="flex-end" direction="row" pt={0}>
    <Link as={RouterLink} to="/problems">
      Problems
    </Link>
    <Link as={RouterLink} to="/wiki">
      Wiki
    </Link>
    <ColorModeSwitcher justifySelf="flex-end" />
    {loginModal}
  </Stack>
);

export default NavbarItems;
