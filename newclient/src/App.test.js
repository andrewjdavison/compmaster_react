import React from 'react';
import ReactDOM from 'react-dom';
import ProviderWrapper from './ProviderWrapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProviderWrapper />, div);
  ReactDOM.unmountComponentAtNode(div);
});
