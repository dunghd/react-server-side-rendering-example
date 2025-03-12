import express from 'express';
import fs from 'fs';
import path from 'path';
import ssr from './src/server.js';
import template from './src/template.js';

// Get directory path in a way that works with Babel transpilation
const __dirname = process.cwd();

// Read JSON file
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './assets/data.json'), 'utf8'),
);

const app = express();

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');

let initialState = {
  isFetching: false,
  apps: data,
};

// server rendered home page
app.get('/', async (req, res) => {
  try {
    const { preloadedState, content } = await ssr(initialState);
    const response = template('Server Rendered Page', preloadedState, content);
    res.setHeader('Cache-Control', 'assets, max-age=604800');
    res.send(response);
  } catch (error) {
    console.error('Error during rendering:', error);
    res.status(500).send('Server error');
  }
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page');
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});

// start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Main app server running on port: ${process.env.PORT || 3000}`);
});
