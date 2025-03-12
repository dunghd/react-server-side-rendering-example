import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/app';
import axios from 'axios';

export default async function render(initialState) {
  // Configure the store with the initial state provided
  const store = configureStore(initialState);

  let content;
  let preloadedState;

  try {
    // Try to use Hypernova for rendering
    const hypernovaUrl = `http://localhost:${process.env.HYPERNOVA_PORT || 3030}/batch`;
    const response = await axios.post(hypernovaUrl, {
      App: {
        name: 'App',
        data: { initialState },
      },
    });

    // Extract HTML from Hypernova response
    content = response.data.results.App.html;
    preloadedState = store.getState();
  } catch (error) {
    console.error(
      'Hypernova rendering failed, falling back to direct rendering:',
      error.message,
    );

    // Fallback to traditional React renderToString
    content = renderToString(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    preloadedState = store.getState();
  }

  return { content, preloadedState };
}
