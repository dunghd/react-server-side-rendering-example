import hypernova from 'hypernova/server';
import { renderReact } from 'hypernova-react';
import React from 'react';
import { Provider } from 'react-redux';
import App from './src/components/app';
import configureStore from './src/redux/configureStore';

hypernova({
  devMode: process.env.NODE_ENV !== 'production',
  port: process.env.HYPERNOVA_PORT || 3030,

  getComponent(name) {
    if (name === 'App') {
      return renderReact(name, (props) => {
        const store = configureStore(props.initialState);
        return (
          <Provider store={store}>
            <App />
          </Provider>
        );
      });
    }
    return null;
  },
});

console.log(
  'Hypernova server running on port:',
  process.env.HYPERNOVA_PORT || 3030,
);
