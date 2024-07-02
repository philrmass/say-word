import { useEffect, useReducer } from 'preact/hooks';
import PropTypes from 'prop-types';
import styles from '../styles/Game.module.css';

function pickWord(list, lastWord) {
  let word = lastWord;
  while (word === lastWord) {
    const index = Math.floor(list.length * Math.random());
    word = list[index].value;
  }
  return word;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'guess':
      if (action.word === state.word) {
        return {
          list: state.list,
          word: pickWord(state.list, state.word),
          score: state.score + 1,
          scoreClass: 'match',
          guesses: 1,
        };
      }
      if (state.guesses > 0) {
        return {
          list: state.list,
          word: state.word,
          score: state.score,
          scoreClass: 'guess',
          guesses: state.guesses - 1,
        };
      }
      return {
        list: state.list,
        word: pickWord(state.list, state.word),
        score: state.score - 1,
        scoreClass: 'fail',
        guesses: 1
      };
    case 'clearClass':
      return {
        ...state,
        scoreClass: '',
      };
    default:
      throw Error('Default');
  }
}

function Game({ result, name, list, stopGame }) {
  const [state, dispatch] = useReducer(gameReducer, { word: pickWord(list, ''), score: 0, guesses: 1, scoreClass: '', list: list});

  useEffect(() => {
    if (result) {
      dispatch({type: 'guess', word: result});
      setTimeout(() => dispatch({type: 'clearClass'}), 1000);
    }
  }, [result]);

  return (
    <main className={styles.main}>
      <div className={styles.questionBox}>
        <div className={styles.question}>
          {state.word}
        </div>
      </div>
      <div className={styles.scoreBox}>
        <div className={`${styles[state.scoreClass]} ${styles.score}`}>
          {state.score}
        </div>
      </div>
      <div className={styles.stopBox}>
        <button className={styles.stop} onClick={stopGame}>Stop</button>
      </div>
    </main>
  );
}

Game.propTypes = {
  result: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  stopGame: PropTypes.func.isRequired,
};

export default Game;
