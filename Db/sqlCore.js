const Pool = require("pg").Pool;

require('dotenv').config();

const connection = require('./config.js');

/*const connection ={
        user: 'postgres',
        host: 'localhost',
        database: 'exercises',
        password: 'postgres',
        port: 5432
        }
*/
const pool = new Pool(connection);


function storePost(data){
    try{  
        pool.connect((err, client, done) => {
            if (err) throw err;
        const query = "insert into posts(title,description,content,author) values($1,$2,$3,$4)"
        const row= Object.values(data);
        client.query(query, row, (err, res) => {
          if(err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:");
              return true;
            }
          });
        });
      }catch(err)
      {
        return err;
        //console.log(err);
      } 
      finally {
          
      }
      
}

function storeNewUser(data){
  try{  
      pool.connect((err, client, done) => {
          if (err) throw err;
      const query = "insert into users(username,emailid,password) values($1,$2,$3)"
      const row= Object.values(data);
      console.log(row);
      client.query(query, row, (err, res) => {
        if(err) {
            console.log(err.stack);
          } else {
            console.log("inserted " + res.rowCount + " row:");
            return true;
          }
        });
      });
    }catch(err)
    {
      return err;
      //console.log(err);
    } 
    finally {
        
    }
    
}

function creatTable(createTableCommand){
  pool.connect((err,client,done)=>{
    try{
    client.query(createTableCommand,(error,result)=>{
      if(error){
        throw error;
      }
      else
      {
        console.log('Table Created')
      }
    });
    }catch(err){
      console.log(err)
      }
    finally{
      done();
     }
    });
  }
 
function getAllPosts(){
    return new Promise((resolve,reject) => {
      pool.connect((err,client,done)=>{
        try{
            const queryText = "select * from posts order by postingdate desc"
          client.query(queryText,(error, queryOutput) => {
            if(error){
              return reject(error)
            } else{
              return resolve(queryOutput.rows)
            }        
           });
          }catch(err){
          console.log(err);
          }
          finally{
          done();
          }
      });
     });
  }
  function getAuthorPosts(author){
    console.log(author)
    return new Promise((resolve,reject) => {
      pool.connect((err,client,done)=>{
        try{
            const queryText = "select * from posts where author='"+author +"' order by postingdate desc" ;
          client.query(queryText,(error, queryOutput) => {
            if(error){
              return reject(error)
            } else{
              return resolve(queryOutput.rows)
            }        
           });
          }catch(err){
          console.log(err);
          }
          finally{
          done();
          }
      });
     });
  }
 
  function getPost(title){
    return new Promise((resolve,reject) => {
      pool.connect((err,client,done)=>{
        try{
            const queryText = "select * from posts where title='" +title +`'`;
          client.query(queryText,(error, queryOutput) => {
            if(error){
              return reject(error)
            } else{
              return resolve(queryOutput.rows)
            }        
           });
          }catch(err){
          console.log(err);
          }
          finally{
          done();
          }
      });
     });
  }

function findUser(email){
    return new Promise((resolve,reject) => {
      pool.connect((err,client,done)=>{
        try{
            const queryText = "select * from users where emailid='" +email +`'`;
            client.query(queryText,(error, queryOutput) => {
            if(error){
              return reject(error)
            } else{
              return resolve(queryOutput.rows)
            }        
           });
          }catch(err){
          console.log(err);
          }
          finally{
          done();
          }
      });
     });
  }
module.exports = { getAllPosts,
                   storePost,
                   getPost,
                   creatTable,
                   storeNewUser,
                   findUser,
                   getAuthorPosts
                 }