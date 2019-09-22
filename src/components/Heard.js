import React, { Fragment } from 'react';
import styles from '../styles/Heard.module.css';

function Heard({ listening, result, toggleListening }) {
  return (
    <main className={styles.main}>
      <span>
        {result && 
          <Fragment>
            <span>{result.transcript}</span>
            <span className={styles.confidence}>{(100 * result.confidence).toFixed(1)}%</span>
          </Fragment>
        }
      </span>
      <span>
        <button className={styles.button} onClick={toggleListening}>
          { listening ? 'Stop' : 'Start' }
        </button>
      </span>
    </main>
  )
}

export default Heard;
