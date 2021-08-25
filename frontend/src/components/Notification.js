/* eslint-disable react/prop-types */
import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

const Notification = ({ notification, setNotification }) => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>{notification}</AlertDescription>
    <CloseButton
      onClick={() => setNotification(null)}
      position="absolute"
      right="8px"
      top="8px"
    />
  </Alert>
);

export default Notification;
