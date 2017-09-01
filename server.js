const express = require('express'),
app = express(),
session = require('express-session'),
flash = require('connect-flash'),
auth = require('./auth/auth.js'),
bodyParser = require('body-parser');

//app.use('/', express.static(__dirname + '/pub'));
app.use(express.static('/pub'));

app.use(session({ 
secret: 'the-best-secret',
saveUninitialized: false,
resave: true
}));

// For parsing post request's data/body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tells app to use password session
app.use(auth.initialize());
app.use(auth.session());

app.use(flash());

// Set up some basic routes
app.get('/', (req, res) => {
    if(req.user) {
        res.send(
            `<p>You\'re logged in as <strong>  ${req.user.username}  </strong>.</p>
            <p><a href="/welcome">Check out the welcome page</a></p>
            <p><a href="/logout">Log out</a></p>`
        );
    }
    else {
        res.send(`<p><a href="/login">Login</a></p>`);
    }
});

app.get('/welcome', (req, res) => {
    if(req.user) {
        res.send(
            `<p>Welcome <strong> ${req.user.username} </strong>.</p>
             <p><a href="/logout">Log out</a></p>`
        );
    }
    else {
        res.send(`<p><a href="/login">Try Login again</a></p>`);
    }
})
app.get('/books', (req, res) => {
    if(req.user) {
        res.send(
            `<p>Books for <strong> ${req.user.username} </strong>.</p>
             <p><a href="/logout">Log out</a></p>`
        );
    }
    else {
        res.send(`<p><a href="/login">Try Login again</a></p>`);
    }
})


app.get('/login', (req, res) => {
    res.send(
        `<html>
        <head>
          <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
          <meta charset="utf-8">
          <title>Login Form</title>
            <style>
                label, input {
                    display: block;
                }
            </style>
        </head>
        <body>
            <h1>Login Please</h1>
            <form action="http://localhost:3000/login" method="post">
        
                <label for="username">username</label>
                <input type="text" id="username" name="username" required />
        
                <label for="password">password</label>
                <input type="password" id="password" name="password" required />
        
                <button>Login</button>
                <p style="color: red;"> ${req.flash('error')} </p>
            </form>
        </body>
        </html>`
    );
});

app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/'); // we could send it to some place else
});

app.post('/login', 
    auth.authenticate('staticLogin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.listen(3000, () => {
    console.log('Simple Passport Local Auth app listening on port 3000!');
  });