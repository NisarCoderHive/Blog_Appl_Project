const express = require('express');

const { config, engine } = require('express-edge');


const blogRoutes = require('./Routes/blogRoutes')

const app = new express();


app.use(express.static('public'));

app.use(engine);

app.set('views',`${__dirname}/views`);

app.use(blogRoutes)

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
 
 
 
 
 

