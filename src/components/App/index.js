import React from 'react';
import Console from './../Console';
import './App.css';

const history = [
  {command: 'ls', output: 'a_file.txt'},
  {command: 'cat a_file.txt', output: 'The contents of the file.'},
];

const promptPrefix = '$ ';

const App = () => (
  <div className="app">
    <Console
      history={history}
      promptPrefix={promptPrefix}
    />
  </div>
);

export default App;
