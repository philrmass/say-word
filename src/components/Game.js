import React from 'react';
import styles from '../styles/Game.module.css';

function Game({ result, name, list, stopGame }) {
  return (
    <main className={styles.main}>
      <div className={styles.questionBox}>
        <div className={styles.question}>
          {'this'}
        </div>
      </div>
      <div className={styles.scoreBox}>
        <div className={styles.score}>
          {'2042'}
        </div>
      </div>
      <div className={styles.stopBox}>
        <button className={styles.stop} onClick={stopGame}>Stop</button>
      </div>
    </main>
  );
}

export default Game;
