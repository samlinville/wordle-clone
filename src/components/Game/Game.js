import React from 'react';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Banner from '../Banner';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [status, setStatus] = React.useState('');

  function handleSubmitGuess(tentativeGuess) {
    const checkedGuess = checkGuess(tentativeGuess, answer);
    const nextGuesses = [...guesses, checkedGuess];
    setGuesses(nextGuesses);

    if (tentativeGuess === answer) {
      setStatus('win');
      return;
    }
    console.log(nextGuesses.length);
    if (nextGuesses.length >= 6) {
      setStatus('lose');
    }
  }

  return (
    <>
      <Banner
        status={status}
        answer={answer}
        tries={guesses.length}
      />
      <GuessResults guesses={guesses} />
      <GuessInput
        handleSubmitGuess={handleSubmitGuess}
        status={status}
      />
    </>
  );
}

export default Game;
