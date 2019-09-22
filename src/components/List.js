import React from 'react';
import styles from '../styles/List.module.css';

function List({ listening, result }) {
  return (
    <main className={styles.main}>
      <div className={styles.wordBox}>
        <span>
          <button className={styles.remove}>x</button>
        </span>
        <div className={styles.result}>
          {result && result.transcript}
        </div>
        <span>
          <button className={styles.add}>+</button>
        </span>
      </div>
      <div className={styles.list}>
        <div className={styles.title}>Words</div>
        <ul>
        </ul>
      </div>
    </main>
  );
}

export default List;
