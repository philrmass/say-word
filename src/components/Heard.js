import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Heard.module.css';

function Heard({ listening, result, toggleListening }) {
  return (
    <main className={styles.main}>
      <span className={styles.confidence}>
        {result && `${(100 * result.confidence).toFixed(1)}%`}
      </span>
      <span>
        {result && result.transcript}
      </span>
      <span>
        <button className={styles.button} onClick={toggleListening}>
          { listening ? 'Stop' : 'Start' }
        </button>
      </span>
    </main>
  )
}

Heard.propTypes = {
  listening: PropTypes.bool.isRequired,
  result: PropTypes.object,
  toggleListening: PropTypes.func.isRequired,
};

export default Heard;
