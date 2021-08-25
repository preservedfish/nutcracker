/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Textarea } from '@chakra-ui/react';

const InputText = ({
  submission,
  setSubmission,
  isCorrect,
  setIsCorrect,
  decoded,
  toast,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (event) => {
    setSubmission(event.target.value);
    setIsInvalid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submission.toUpperCase() === decoded) {
      setIsCorrect(true);
      setIsInvalid(false);
      toast({
        title: 'Correct!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        value={submission}
        onChange={handleChange}
        isDisabled={isCorrect}
        isInvalid={isInvalid}
        placeholder="Your answer. The punctuation should match the original's."
      />
      <Button type="submit" isDisabled={isCorrect}>
        Submit
      </Button>
    </form>
  );
};

export default InputText;
