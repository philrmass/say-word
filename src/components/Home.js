import { useState } from 'preact/hooks';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';

function Home({ listening, result, lists, addList, removeList, openList, startGame }) {
  const [addingList, setAddingList] = useState(false);

  function add() {
    if (result) {
      addList(result.transcript.trim());
      setAddingList(false);
    }
  }

  return (
    <>
      { addingList &&
        <div className={styles.addBox}>
          <div className={styles.addName}>{result && result.transcript}</div>
          <button onClick={add} className={styles.add}>+</button>
        </div>
      }
      <div>
        <div className={styles.listTitle}>
          <span>Lists</span>
          <button onClick={() => setAddingList(true)} className={styles.add}>+</button>
        </div>
        <ul>
          { Object.keys(lists).map((name) => (
            <li key={name} className={styles.listItem}>
              <button onClick={() => startGame(name)} className={styles.play}>></button>
              <button onClick={() => openList(name)} className={styles.listName}>{name}</button>
              {/*<button onClick={() => removeList(name)} className={styles.remove}>x</button>*/}
            </li>
          ))}
    </ul>
      </div>
    </>
  );
}

Home.propTypes = {
  listening: PropTypes.bool.isRequired,
  result: PropTypes.object,
  lists: PropTypes.object.isRequired,
  addList: PropTypes.func.isRequired,
  openList: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default Home;
