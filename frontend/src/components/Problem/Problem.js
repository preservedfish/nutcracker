import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Tag,
  Divider,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import Sidebar from './Sidebar';
import InputTable from './InputTable';
import InputText from './InputText';
import userService from '../../services/user';

const Problem = ({ user, cipher, completed, setCompleted }) => {
  const [submission, setSubmission] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [modifiedIndices, setModifiedIndices] = useState([]);
  const [tableLetters, setTableLetters] = useState({});
  const toast = useToast();

  const alphabet =
    cipher && cipher.type === 'xenocrypt'
      ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    if (cipher) {
      setTableLetters(
        alphabet.reduce((obj, key) => ({ ...obj, [key]: '' }), {})
      );
    }
  }, [cipher]);

  useEffect(async () => {
    if (isCorrect && !completed.includes(cipher.id)) {
      if (user) {
        try {
          await userService.updateCompleted(cipher.id);
        } catch (e) {
          console.error(e);
        }
      }
      const newCompleted = completed.concat(cipher.id);
      window.localStorage.setItem(
        'completedProblems',
        JSON.stringify(newCompleted)
      );
      setCompleted(newCompleted);
    }
  }, [isCorrect]);

  if (!cipher) {
    return null;
  }

  if (!submission) {
    setSubmission(cipher.encoded);
  }

  const handleChange = (event) => {
    let temp = submission;
    let tempIndices = modifiedIndices;

    setTableLetters({
      ...tableLetters,
      [event.target.id]: event.target.value,
    });

    // If input is valid
    if (event.target.value === '' || event.target.value.match(/[a-z]/i)) {
      for (let i = 0; i < cipher.encoded.length; i++) {
        // If the letter in the encoded string matches the letter that's being changed
        if (cipher.encoded[i] === event.target.id) {
          // If the input is a blank, reset the letter at that position
          if (!event.target.value) {
            temp =
              temp.substring(0, i) + event.target.id + temp.substring(i + 1);
            tempIndices = tempIndices.filter((indx) => indx !== i);
          } else {
            temp =
              temp.substring(0, i) +
              event.target.value.toUpperCase() +
              temp.substring(i + 1);
            tempIndices = tempIndices.concat(i);
          }
        }
      }
    }

    if (temp === cipher.decoded) {
      setIsCorrect(true);
      toast({
        title: 'Correct!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    setSubmission(temp);
    setModifiedIndices(tempIndices);
  };

  const handleReset = () => {
    setIsCorrect(false);
    setSubmission(cipher.encoded);
    toast.closeAll();
    if (cipher.type !== 'vigenere') {
      setModifiedIndices([]);
      const copy = { ...tableLetters };
      Object.keys(copy).forEach((l) => {
        copy[l] = '';
      });
      setTableLetters(copy);
    }
  };

  return (
    <Box display="grid" gridAutoColumns="1fr">
      <Box gridColumn="1/2" gridRow="1/2" padding="5px" borderWidth="1px">
        <Flex as={Heading} size="md" direction="row" align="center">
          {cipher.title}
          <Tag
            ml={1}
            mt={1}
            size="sm"
            colorScheme={completed.includes(cipher.id) ? 'green' : 'gray'}
          >
            {completed.includes(cipher.id) ? 'Solved' : 'Unsolved'}
          </Tag>
        </Flex>
        <Text color="gray.500" py={1}>
          Type: {cipher.type}
        </Text>
        <i>{cipher.description}</i>{' '}
        {cipher.source ? (
          <Link color="blue.400" href={cipher.source}>
            Source
          </Link>
        ) : null}
        <Divider />
        <p>
          {cipher.type === 'vigenere'
            ? cipher.encoded // Because text input allows you to type anything
            : submission.split('').map((letter, index) =>
                modifiedIndices.includes(index) ? (
                  // eslint-disable-next-line react/no-array-index-key
                  <b key={index}>{letter}</b>
                ) : (
                  letter
                )
              )}
        </p>
        {isCorrect ? (
          <>
            <b>Reset:</b>
            <IconButton
              onClick={handleReset}
              aria-label="Reset problem"
              icon={<RepeatIcon />}
              ml={1}
            />
          </>
        ) : null}
      </Box>
      <Box gridColumn="2/3" gridRow="1/2" borderWidth="1px">
        <Sidebar />
      </Box>
      <Box gridColumn="1/3" gridRow="2/3">
        {(cipher.type === 'vigenere' && (
          <InputText
            submission={submission}
            setSubmission={setSubmission}
            isCorrect={isCorrect}
            setIsCorrect={setIsCorrect}
            decoded={cipher.decoded}
            toast={toast}
          />
        )) || (
          <InputTable
            tableLetters={tableLetters}
            alphabet={alphabet}
            isCorrect={isCorrect}
            handleChange={handleChange}
          />
        )}
      </Box>
    </Box>
  );
};

Problem.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  cipher: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    encoded: PropTypes.string.isRequired,
    decoded: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    description: PropTypes.string,
    source: PropTypes.string,
  }),
  completed: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCompleted: PropTypes.func.isRequired,
};

Problem.defaultProps = {
  user: null,
  cipher: null,
};

export default Problem;
