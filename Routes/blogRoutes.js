const express = require('express') ;

const path = require('path');

const bodyParser = require('body-parser');

const sqlOperator = require('../Db/sqlCore.js')

var urlencodeddata = bodyParser.urlencoded({extended:false})

const router = express.Router();

router.get('/',async(req,res)=>{
    sqlOperator.getAllPosts()
    .then(posts =>{
        res.render('index',{posts})
    })
    .catch(err =>{
        console.log(err)
    })
    /*const posts = await sqlOperator.getAllPosts();
    //console.log(posts)
    res.render('index',{posts});*/
})

router.get('/viewpost/:id',async(req,res)=>{
    console.log(req.params.id)
    const title =req.params.id ;
    sqlOperator.getPost(title)
    .then(posts => {
        res.render('viewpost',{posts})
    })
    .catch(err =>{
       console.log(err)
   })
})

router.post('/viewpost',urlencodeddata,async(req,res)=>{
    const title = req.body.title;
    //console.log(req.body)
    const post = await sqlOperator.getPost(title)
    //res.render('viewpost',{post:'datafrommiddleware'})
    
})



router.get('/newPost', (req, res) => {
    res.render('createPost')
});

router.get('/samplepost',(req,res)=>{
    res.render('samplepost');
})

router.get('/about',(req,res)=>{
    res.render('about');
})

router.get('/signup',(req,res)=>{
    res.render('registerUser')
})

router.get('/login',(req,res)=>{
    res.render('loginUser')
})


router.post('/createpost',urlencodeddata,(req,res)=>{
    sqlOperator.storePost(req.body)
    res.render('createPost');
})

router.get ('/editpost/:id',urlencodeddata,(req,res)=>{
    const title =req.params.id ;
    sqlOperator.getPost(title)
    .then(posts => {
        res.render('editPost',{posts})
    })
    .catch(err =>{
       console.log(err)
   })
    
})

router.get('/deletepost/:id',urlencodeddata,(req,res)=>{
    const title =req.params.id ;
    sqlOperator.deletePost(title)
    res.render('deletePost');
 })



/*app.get('/ab
+ut.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
})


app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});*/

router.get('/scripts.js',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../public/js/scripts.js'));
})

router.get('/styles.css',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../public/css/styles.css'));
})


module.exports = router;