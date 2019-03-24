import React from 'react';
import ReactDOM from 'react-dom';
import './homepage.css';
import './homepage.html';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();