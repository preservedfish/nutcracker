import React from 'react';
import { Box, Text, Heading, Link, Divider } from '@chakra-ui/react';

const Wiki = () => (
  <Box px={2}>
    <Heading>Guide to The Ciphers</Heading>
    <Text>
      This guide gives a brief overview of the ciphers used in this website. If
      you wish to read about these in more detail or learn about other ciphers,
      the{' '}
      <Link
        color="blue.400"
        href="https://scioly.org/wiki/index.php/Codebusters"
      >
        Science Olympiad wiki
      </Link>{' '}
      is an excellent resource for that.
    </Text>
    <Divider />
    <Box>
      <Heading as="h3" size="md" mt={4}>
        Caesar
      </Heading>
      <Text>
        The Caesar cipher is a shift cipher, meaning that all of the letters are
        shifted to the left or right by some amount. For example, we can encode
        &apos;Apple&apos; by shifting the letters to the right by 2, resulting
        in &apos;Crrng&apos;. Decoding simply involves shifting all of the
        letters in the cipher until they form something coherent. This can be
        time-consuming, so a good strategy is to first shift the single-letter
        words to see if you can form an &apos;I&apos; or &apos;A&apos;, then see
        if that shift forms coherent words in the rest of the cipher.
      </Text>
      <Heading as="h3" size="md" mt={4}>
        Aristocrat
      </Heading>
      <Text>
        The Aristocrat cipher is a substition cipher, where you decode
        step-by-step by replacing all instances of a letter with another in the
        English alphabet. For example, if your cipher is &apos;Fjbbq&apos;, you
        can replace all instances of &apos;b&apos; with &apos;l&apos; to get
        something like &apos;Fjllq.&apos; Afterwards, you&apos;d continue
        substituting letters until you fully decode the cipher to
        &apos;Hello.&apos;
      </Text>
      <Heading as="h3" size="md" mt={4}>
        Xenocrypt
      </Heading>
      <Text>
        The Xenocrypt cipher is a substition cipher, just like the Aristocrat.
        The only difference is that it uses the Spanish alphabet instead.
      </Text>
      <Heading as="h3" size="md" mt={4}>
        Vigenere
      </Heading>
      <Text>
        The Vigenere cipher is a substition cipher that involves more than one
        substition alphabet. This is why solving it typically involves a key,
        since the same letter might stand for something else in different
        places. The key is most likely shorter than the cipher, so when you line
        them up you will have to repeat the key when necessary. Solving a
        Vigenere can be done with a dedicated table, which is provided on this
        website&apos;s interface. To encrypt, all you need to do find where a
        letter in the plaintext and a letter in the key intersect via the
        rows/columns. To decrypt, choose either the rows or columns to represent
        the letter of the key, find the letter of the ciphertext in that
        row/column, and find the letter of the plaintext in the opposing
        column/row.
      </Text>
    </Box>
  </Box>
);

export default Wiki;
