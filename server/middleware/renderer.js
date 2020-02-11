import path from 'path';
import fs from 'fs';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';

import App from "../../src/App";
import store from "../../src/store";


export default (req,res,next) => {
    const filePath = path.resolve("./build/index.html");

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        const app = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
        );
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
        const preloadedState = store.getState();
        // return res.send(renderFullPage(app,preloadedState))
    });
}
function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/recipes/server-rendering/#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}
          </script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
      `
  }