const express = require('express');

const flash = require('connect-flash')

const edge = require("edge.js");

const session = require('express-session');

const { config, engine } = require('express-edge');

const blogRoutes = require('./Routes/blogRoutes')


const app = new express();

app.use(express.static('public'));

app.use(engine); 

app.set('views',`${__dirname}/views`);

app.use(session({secret:'secret',
resave: true,
saveUninitialized: true}));

app.use(flash());

app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.success_msg = req.flash('failure_msg');
    res.locals.user =req.session.user;
    next()
});

app.use(blogRoutes)

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
 
 
 
 
 

