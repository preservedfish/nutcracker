import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import Logo from './Logo';
import NavbarItems from './NavbarItems';

// Referenced https://raptis.wtf/blog/create-a-navbar-with-chakra-ui-react/
const Navbar = ({ loginModal }) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={4}
    bg="transparent"
    color="blue.400"
    boxShadow="0px 2px 8px -6px rgba(0,0,0,.5)"
  >
    <Logo />
    <NavbarItems loginModal={loginModal} />
  </Flex>
);

Navbar.propTypes = {
  loginModal: PropTypes.element.isRequired,
};

export default Navbar;
