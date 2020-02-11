import path from 'path';

import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import { StaticRouter, matchPath } from 'react-router-dom';

import { matchRoutes } from 'react-router-config';

import serialize from 'serialize-javascript';
import Routes from '../src/routes';


import store from "../src/store";

import { Provider } from 'react-redux';

import App from "../src/App";
import { act } from 'react-dom/test-utils';

const PORT = process.env.PORT || 3006;
const app = express();
// const router = express.Router();

// router.use('^/$',serverRenderer);

// router.use(express.static('./build'));

// app.use(router);
app.use(express.static('./build'));

app.get('/*', (req, res, next) => {
  // serverRenderer(req,res);
  const routes = matchRoutes(Routes.routes, req.path);
  console.log("lll url",routes);
  console.log("all url",req.url)

  const promises = routes
    .map(({ route }) => {
      // if(match.url.includes('.')) return false;
      
      return route.fetchInitialData ? route.fetchInitialData(req.path) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });
    
    console.log("alll actual routes",promises);
    // const activeRoute = Routes.routes.find((route) => {
    //   try {
    //     return matchPath(req.url,route)
    //   } catch (error) {
        
    //   } 
    // }) || {};
    // console.log("myroute",activeRoute);
    
    // const promise = activeRoute.fetchInitialData
    //   ? activeRoute.fetchInitialData(req.path)
    //   : Promise.resolve();
    
    // console.log("promise",promise);

    Promise.all(promises).then((data) => {
    // promise.then((data) => {
      console.log(data);
      const context = {data}
      const app = ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.path} context={context}>
            <App />
            {/* <div>{renderRoutes(Routes)}</div> */}
          </StaticRouter>
            
        </Provider>
        );

        const preloadedState = store.getState();

        return res.send(
          renderFullPage(app,preloadedState,data)
        );
      // const indexFile = path.resolve('./build/index.html');
      // fs.readFile(indexFile, 'utf8', (err, data1) => {
      //   if (err) {
      //     console.error('Something went wrong:', err);
      //     return res.status(500).send('Oops, better luck next time!');
      //   }

        
        
      // });
      // if (context.notFound) {
      //   res.status(404);
      // }
  
      // res.send(content);
    }).catch(next);
  
});

function renderFullPage(html, preloadedState,routeData) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clothentik</title>
          <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3006">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/recipes/server-rendering/#security-considerations
            window.__PRELOADED_STATE__ = ${serialize(preloadedState).replace(
              /</g,
              '\\u003c'
            )}
            window.__ROUTE_DATA__ = ${serialize(routeData)}
          </script>
          <script src="/bundle.js" defer></script>
        </body>
      </html>
      `
  }


app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});