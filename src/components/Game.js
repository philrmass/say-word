import React, { useEffect, useState } from 'react';
import styles from '../styles/Game.module.css';

function Game({ result, name, list, stopGame }) {
  const [count, setCount] = useState(0);
  const [retry, setRetry] = useState(0);
  const [word, setWord] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreClass, setScoreClass] = useState('');

  function pickWord(list) {
    const index = Math.floor(list.length * Math.random());
    return list[index];
  }

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (count === 0) {
      setWord(pickWord(list));
      setCount(1);
    } else {
      const said = (result && result.transcript.trim()) || '';
      if (said === word.value) {
        setWord(pickWord(list));
        setScore((score) => score + 1);
        setCount((count) => count + 1);
        setRetry(0);
        setScoreClass('match');
        setTimeout(() => setScoreClass(''), 1000);
      } else if (retry > 0) {
        setWord(pickWord(list));
        setScore((score) => score - 1);
        setCount((count) => count + 1);
        setRetry(0);
        setScoreClass('fail');
        setTimeout(() => setScoreClass(''), 1000);
      } else {
        setRetry((retry) => retry + 1);
        setScoreClass('retry');
        setTimeout(() => setScoreClass(''), 1000);
      }
    }
  }, [result, list]);

  return (
    <main className={styles.main}>
      <div className={styles.questionBox}>
        <div className={styles.question}>
          {word.value}
        </div>
      </div>
      <div className={styles.scoreBox}>
        <div className={`${styles[scoreClass]} ${styles.score}`}>
          {score}
        </div>
      </div>
      <div className={styles.stopBox}>
        <button className={styles.stop} onClick={stopGame}>Stop</button>
      </div>
    </main>
  );
}

export default Game;
