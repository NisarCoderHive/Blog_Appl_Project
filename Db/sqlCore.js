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
//console.log(pool);

function storePost(data){
    try{  
        pool.connect((err, client, done) => {
            if (err) throw err;
        const query = "insert into posts values($1,$2,$3)"
        const row= Object.values(data);
        console.log(client)
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
            const queryText = "select * from posts"
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
module.exports = { getAllPosts,
                   storePost,
                   getPost,
                   creatTable
                 }