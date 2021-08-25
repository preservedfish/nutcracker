import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useDisclosure,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import Notification from '../Notification';
import loginService from '../../services/login';
import userService from '../../services/user';

const LoginModal = ({ user, setUser, setCompleted }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    onClose();
    setUsername('');
    setPassword('');
    setNotification(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const returnedUser = await loginService.login({ username, password });
      handleClose();

      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser));
      setUser(returnedUser);
      userService.setToken(returnedUser.token);
      window.localStorage.setItem(
        'completedProblems',
        JSON.stringify(returnedUser.completed)
      );
      setCompleted(returnedUser.completed);
    } catch (e) {
      if (e.response.status === 401) {
        setNotification(e.response.data.error);
      } else {
        setNotification('An error has occurred');
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    window.localStorage.removeItem('completedProblems');
    setUser(null);
    setCompleted([]);
  };

  return (
    <>
      {!user ? (
        <>
          <Button onClick={onOpen}>Login</Button>

          <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login to Nutcracker!</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleLogin}>
                <ModalBody>
                  {notification && (
                    <Notification
                      notification={notification}
                      setNotification={setNotification}
                    />
                  )}
                  <FormControl mb="4">
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      value={username}
                      name="Username"
                      onChange={({ target }) => setUsername(target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      name="Password"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    Login
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
    </>
  );
};

LoginModal.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  setUser: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
};

LoginModal.defaultProps = {
  user: null,
};

export default LoginModal;
