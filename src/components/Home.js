import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

function Home({ listening, result, addList }) {
  const [addingList, setAddingList] = useState(false);

  function add(name) {
    if (addingList && result) {
      addList(result.transcript);
      setAddingList(false);
    } else {
      setAddingList(true);
    }
  }

  return (
    <div className={styles.addBox}>
      { addingList &&
        <div className={styles.name}>{result.transcript}</div>
      }
      <button onClick={add} className={styles.add}>+</button>
    </div>
  );
}

export default Home;
