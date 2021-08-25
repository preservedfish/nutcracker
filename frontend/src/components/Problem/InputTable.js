/* eslint-disable react/prop-types */
import React from 'react';
import { Input, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const InputTable = ({ tableLetters, alphabet, isCorrect, handleChange }) => (
  <Table style={{ margin: 'auto', marginTop: 30 }} size="sm">
    <Thead>
      <Tr>
        <Th>&nbsp;</Th>
        {alphabet.map((letter) => (
          <Th key={letter}>{letter}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Th>Replacement</Th>
        {alphabet.map((letter) => (
          <Td key={letter} style={{ padding: 0 }}>
            <Input
              value={tableLetters[letter] || ''}
              type="text"
              id={letter}
              maxLength="1"
              size="1"
              readOnly={isCorrect}
              onChange={(event) => handleChange(event)}
            />
          </Td>
        ))}
      </Tr>
    </Tbody>
  </Table>
);

export default InputTable;
