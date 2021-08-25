import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Link } from '@chakra-ui/react';

const Problems = ({ ciphers, completed }) => (
  <Box>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Status</Th>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Difficulty</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ciphers
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((cipher) => (
            <Tr key={cipher.id}>
              <Td>
                {completed.includes(cipher.id) ? (
                  <>
                    Solved{' '}
                    <span role="img" aria-label="check mark">
                      ✔️
                    </span>
                  </>
                ) : (
                  'Unsolved'
                )}
              </Td>
              <Td>
                <Link
                  color="blue.400"
                  as={RouterLink}
                  to={`/problems/${cipher.id}`}
                >
                  {cipher.title}
                </Link>
              </Td>
              <Td>{cipher.type}</Td>
              <Td>
                {(cipher.difficulty === 1 && (
                  <span role="img" aria-label="grinning face">
                    😀
                  </span>
                )) ||
                  (cipher.difficulty === 2 && (
                    <span role="img" aria-label="neutral face">
                      😐
                    </span>
                  )) ||
                  (cipher.difficulty === 3 && (
                    <span role="img" aria-label="anxious face with sweat">
                      😰
                    </span>
                  ))}
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  </Box>
);

Problems.propTypes = {
  ciphers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      encoded: PropTypes.string.isRequired,
      decoded: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      difficulty: PropTypes.number.isRequired,
      description: PropTypes.string,
      source: PropTypes.string,
    })
  ).isRequired,
  completed: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Problems;
