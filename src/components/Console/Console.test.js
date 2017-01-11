import React from 'react';
import ReactDOM from 'react-dom';
import Console from './Console';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Console />, div);
});
