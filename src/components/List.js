import React from 'react';
import styles from '../styles/List.module.css';

function List({ listening, result, listName, list, addWord, removeWord }) {
  return (
    <main className={styles.main}>
      <div className={styles.wordBox}>
        <div className={styles.result}>
          {result && result.transcript}
        </div>
        <span>
          <button className={styles.add} onClick={() => addWord(result.transcript, listName)}>+</button>
        </span>
      </div>
      <div className={styles.list}>
        <div className={styles.title}>{listName}</div>
        <ul>
          { list && Object.keys(list).map((word) => (
            <li key={word} className={styles.word}>
              {word}
              <button className={styles.remove} onClick={() => removeWord(word, listName)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default List;
