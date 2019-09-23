import React, { Fragment, useState } from 'react';
import { useLocalStorage } from '../utilities/storage';
import Heard from './Heard';
import Home from './Home';
import List from './List';

function App() {
  const [recognizer, setRecognizer] = useState(null);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState({ transcript: 'hello', confidence: .9544 });
  const [listName, setListName] = useState(null);
  const [lists, setLists] = useLocalStorage('wordLists', {});

  function toggleListening() {
    if (listening) {
      recognizer.abort();
      setRecognizer(null);
      setResult(null);
      setListening(false);
    } else {
      const r = new window.webkitSpeechRecognition();
      r.continuous = true;
      r.onresult = (e) => {
        const result = e.results[e.results.length - 1][0];
        setResult(result);
      };
      r.start();
      setRecognizer(r);
      setListening(true);
    }
  }

  function addList(name) {
    if (!lists[name]) {
      setLists((lists) => ({
        ...lists,
        [name]: {},
      }));
    }
  }

  function openList(name) {
    setListName(name);
  }

  function closeList() {
    setListName(null);
  }

  function addWord(word, name) {
    const list = lists[name];
    list[word.trim()] = {};
    setLists({
      ...lists,
      [name]: {
        ...list,
      }
    });
  }

  function removeWord(word, name) {
    const list = lists[name];
    delete list[word];
    setLists({
      ...lists,
      [name]: {
        ...list,
      }
    });
  }

  //const showGame;
  const showList = Boolean(listName);
  const showHome = !showList;

  return (
    <Fragment>
      <header>
        <Heard
          listening={listening}
          result={result}
          toggleListening={toggleListening}
        />
      </header>
      <main className='page'>
        <div className='accent appName'><div>Say</div><div>Word</div></div>
        { showHome &&
            <Home
              listening={listening}
              result={result}
              lists={lists}
              addList={addList}
              openList={openList}
            />
        }
        { showList && 
            <List
              listening={listening}
              result={result}
              listName={listName}
              list={lists[listName]}
              closeList={closeList}
              addWord={addWord}
              removeWord={removeWord}
            />
        }
      </main>
    </Fragment>
  );
}

export default App;
