import React, { Fragment, useState } from 'react';
import styles from '../styles/Home.module.css';

function Home({ listening, result, lists, addList, openList }) {
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
    <Fragment>
      <div className={styles.addBox}>
        { addingList &&
          <div className={styles.name}>{result.transcript}</div>
        }
        <button onClick={add} className={styles.add}>+</button>
      </div>
      <div>
        <div>Lists</div>
        <ul>
          { Object.keys(lists).map((name) => (
            <li key={name}>
              <button onClick={() => openList(name)} className={styles.listName}>{name}</button>
            </li>
          ))}
    </ul>
      </div>
    </Fragment>
  );
}

export default Home;
