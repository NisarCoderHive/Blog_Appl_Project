const path = require('path');

//const expressEdge = require('express-edge');

const express = require('express');

const { config, engine } = require('express-edge');

const app = new express();

app.use(express.static('public'));

app.use(engine);

app.set('views',`${__dirname}/views`);

//console.log(`${__dirname}/views`);
/*app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});*/

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/new', (req, res) => {
    res.render('create')
});

app.get('/samplepost',(req,res)=>{
    res.render('samplepost');
})

app.get('/about',(req,res)=>{
    res.render('about');
})


app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})


app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});



app.get('/public/js/scripts.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public/js/scripts.js'));
})

app.get('/public/css/styles.css',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public/css/styles.css'));
})

app.listen(4000, () => {
    console.log('App listening on port 4000')
}); 
 
 
 
 
 

