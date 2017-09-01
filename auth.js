var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
user = { // No one is reading this, right?
    _id: 1,
    username: 'bob',
    password: '123',
    email: 'bob@sample.com',
    age: '23'
};

// Register an authorization strategy
passport.use('staticLogin', new LocalStrategy(
function(username, password, done) {
    // For now we just do this, later we should check again db
    if(username === user.username && password === user.password) {
        return done(null, user);
    }
    else {
        done(null, false, { message: 'Bad username and/or password.' });
    }
}
));

// Use this for storing user info into session 
passport.serializeUser(function(user, done) {
done(null, user._id);
});

// Use this for retrieving user from session
passport.deserializeUser(function(id, done) {
// Next time we will check the user by querying against db
// using the id
done(null, user);
});

module.exports = passport;