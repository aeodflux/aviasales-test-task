import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import './lib/server';
import { App } from './components/app';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);