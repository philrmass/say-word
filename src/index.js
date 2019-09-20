import React from 'react';
import ReactDOM from 'react-dom';
import './styles/normalize.css';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
