import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import ProviderWrapper from './ProviderWrapper.jsx';

render(
    <ProviderWrapper />
    , document.getElementById('root')
);

