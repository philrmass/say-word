import React, { Fragment, useState } from 'react';
import { useLocalStorage } from '../utilities/storage';
import Game from './Game';
import Heard from './Heard';
import Home from './Home';
import List from './List';

function App() {
  const [recognizer, setRecognizer] = useState(null);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState({ transcript: 'hello', confidence: .9544 });
  const [listName, setListName] = useState(null);
  const [lists, setLists] = useLocalStorage('wordLists', {});
  const [gameName, setGameName] = useState(null);

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

  function startGame(name) {
    if (!listening) {
      toggleListening();
    }
    setGameName(name);
  }

  function stopGame(name) {
    setGameName(null);
  }

  function addWord(word, name) {
    const list = lists[name];
    word = word.trim();
    list[word] = { value: word };
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

  const showGame = Boolean(gameName);
  const showList = !showGame && Boolean(listName);
  const showHome = !showGame && !showList;

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
            startGame={startGame}
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
        { showGame &&
          <Game
            result={result}
            name={gameName}
            list={Object.values(lists[gameName])}
            stopGame={stopGame}
          />
        }
      </main>
    </Fragment>
  );
}

export default App;
