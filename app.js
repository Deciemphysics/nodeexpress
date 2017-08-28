const express = require('express');
const session = require('express-session');

let app = express();

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.use(session({
  secret: 'keyboard cat',
  cookie: {maxAge:30000}
}))

app.use(express.static('./public'));

app.get('/views', (req, res, next) => {
  if( req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>Views: ' + req.session.views + '</p>');
    res.write(`<p> expires in ${req.session.cookie.maxAge / 1000} seconds</p>`);
    res.end();
  } else {
    req.session.views = 1;
    res.end('Welcome to the session demo.')
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});