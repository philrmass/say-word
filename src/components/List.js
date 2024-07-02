import PropTypes from 'prop-types';
import styles from '../styles/List.module.css';

function List({ listening, result, listName, list, closeList, addWord, removeWord }) {
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
      <div>
        <div className={styles.title}>
          {listName}
          <button className={styles.doneButton} onClick={closeList}>Done</button>
        </div>
        <div className={styles.list}>
          { list && Object.keys(list).map((word) => (
            <div key={word} className={styles.word}>
              {word}
              <button className={styles.remove} onClick={() => removeWord(word, listName)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

List.propTypes = {
  listening: PropTypes.bool.isRequired,
  result: PropTypes.object,
  listName: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  closeList: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
  removeWord: PropTypes.func.isRequired,
};

export default List;
