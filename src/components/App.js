import React, { useEffect, useState } from 'react';

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const sr = new window.webkitSpeechRecognition();
    sr.onresult = (e) => {
      const result = e.results[e.results.length - 1][0];
      setResults(results => [...results, result]);
    }
    sr.continuous = true;
    sr.start();
  }, []);

  return (
    <div className='page'>
      <div className='appName'><div>Say</div><div>Word</div></div>
      <button>Go</button>
      <div className='title'>Results</div>
      <ul>
        { results.map((result) => (
          <li key={result.confidence}>
            <span>{result.transcript}</span>
            <span className='confidence'>{(100 * result.confidence).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
