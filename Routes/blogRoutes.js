const express = require('express') ;

const path = require('path');

const bcrypt = require('bcrypt')

const bodyParser = require('body-parser');

// const passport = require('passport');

const sqlOperator = require('../Db/sqlCore.js')

//require('../models/authenLogin')(passport);

var urlencodeddata = bodyParser.urlencoded({extended:false})

const router = express.Router();

router.get('/',async(req,res)=>{
    sqlOperator.getAllPosts()
    .then(posts =>{
        res.render('index',{posts})
    })
    .catch(err =>{
        res.send('<h2>Error</h2>'+ err)
        //console.log(err)
    })
    /*const posts = await sqlOperator.getAllPosts();
    //console.log(posts)
    res.render('index',{posts});*/
})

router.get('/myposts/:id',async(req,res)=>{
    const author = req.params.id ;
    sqlOperator.getAuthorPosts(author)
    .then(posts =>{
        res.render('index',{posts})
    })
    .catch(err =>{
        console.log(err)
        res.send('<h2>Error</h2>'+ err)
        
    })
    /*const posts = await sqlOperator.getAllPosts();
    //console.log(posts)
    res.render('index',{posts});*/
})
router.get('/viewpost/:id',async(req,res)=>{
    // console.log(req.params.id)
    const title =req.params.id ;
    sqlOperator.getPost(title)
    .then(posts => {
        res.render('viewpost',{posts})
    })
    .catch(err =>{
        console.log(err)
        res.send('<h2>Error</h2>'+ err)
       
   })
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

router.post('/signup',urlencodeddata,async(req,res)=>{
    const {username,email,password} = req.body ;
    const newUser ={username,email,password}
    bcrypt.hash(newUser.password, 10, async function (error, encrypted) {
        newUser.password = encrypted
        await sqlOperator.storeNewUser(newUser);
    })
    /*bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,async(err,hash)=>{
            if(err) throw err;
            newUser.password = hash ;
            await sqlOperator.storeNewUser(newUser);
        })
    })*/
    
    res.redirect('/loginUser')
    
})

router.get('/loginUser',(req,res)=>{
    res.render('loginUser')
})

/*router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect :'/loginUser',
        failureFlash : false
    })(req,res,next)
    })*/

router.post('/login',urlencodeddata,(req,res)=>{
    const { email , password } = req.body
    sqlOperator.findUser(email)
    .then(user =>{
        console.log(user)
        if(user.length == 0){
            console.log('invalid user')
            res.redirect('/loginUser')
            return;
        }
        bcrypt.compare(password,user[0].password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                console.log('Valid user');
                req.session.user = user[0];
                res.redirect('/')
            }
            else {
                console.log('invalid password')
                res.redirect('/invaliduser')
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })

})


router.get('/logoutuser',(req,res)=>{
    req.session.user = null;
    res.redirect('/')
})

router.post('/createpost',urlencodeddata,(req,res)=>{
    try{
        const {title,description,content}=req.body;
        let author =req.session.user.username;
        var postdetails = {title,description,content,author}   
        sqlOperator.storePost(postdetails)
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        res.json({status :'error'})    }  
    
})


router.get('/dashboard',(req,res)=>{
    res.redirect('/')
    //  res.render('dashboard')
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

router.get('/dashboard',(req,res)=>{
    res.send(req.session.user);
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