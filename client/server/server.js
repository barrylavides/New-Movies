import express from 'express';
import http from 'http';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match,RouterContext} from 'react-router';

import {routes} from '../client/routes';

const app = express();

app.use(express.static(__dirname +'/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

app.get('*', (req, res) => {
  // routes is our object of React routes defined above
  match({routes, location: req.url}, (err, redirectLocation, props) => {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // if we got props, that means we found a valid component to render
      // for the given route
      const markup = renderToString(<RouterContext {...props} />);

      // render 'index.ejs', but pass in the markup we want it to display
      res.render('index', {markup});
    } else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);

server.listen(3003);
server.on('listening', () => {
  console.log('Listening on 3003');
});