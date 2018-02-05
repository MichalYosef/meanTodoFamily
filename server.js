// const mongo = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;
const http = require("http");
const express = require('express');
const path=require('path');
const mysql      = require('mysql');
const bodyParser = require('body-parser')
app = express();

const port = 2016;
// const connectionString = 'mongodb://localhost:27020/todo';
var cwd = process.cwd();


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'family_todo'
  });
   
connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
  

// Create node.js express server to listen for client requests

const server = app.listen(3000, "127.0.0.1", function () 
{
    const host = server.address().address
    const port = server.address().port
  
    console.log("Family ToDo Server is running on http://%s:%s :-)", host, port)
  
});

// Send main page on general request

app.get('/', function(req,res){
    res.sendFile(cwd+'/public/index.html')
})

// Node.js Rest Api

// Create a GET Rest Request to access all records from MySQL database table.
// use MySQL query to fetch data from db 
// and send json data to client as response object.

// Get all tasks
app.get('/tasks', function (req, res) {
    let joinQuesy =`
    SELECT tasks.id, tasks.description, tasks.date, tasks.family_member_id, family_members.name FROM tasks INNER JOIN family_members ON tasks.family_member_id=family_members.id`;

    //'select * from tasks'

    connection.query( joinQuesy, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 // Get all family members
app.get('/family', function (req, res) {
    connection.query('select * from family_members', function (error, results, fields) {
       if (error) throw error;
       res.end( JSON.stringify(results) );
     });
 });




// mongo.connect(connectionString, function(err, dbParent)
// {
//     if(err) console.log('cannot connect ' + err.message);
//     else
//     {
//         // get reference to db collection
//         const myDb = dbParent.db('todo');
//         const items = myDb.collection('items');
        
//         // insert
//         app.post('/api/items', function(req, res)
//         {
//             let newItem = req.body;
    
//             items.insert( newItem, function(err, result){
//                 if(!err) res.send( newItem);
//                 else throw(err)
    
//             })
            
//         });

//         // get
//         app.get('/api/items', function(req, res){
//             items.find().toArray( function(err, result){
//                 res.send(result)
//             })
//         })

//         // delete
//         app.delete('/api/items/:id', function(req, res)
//         {        
//             try 
//             {
//                 var id = new ObjectId( req.params.id);

//                 // let deleteResult = 
//                 items.deleteOne({_id: id}, function(err, result) 
//                 {
//                     if(err)
//                     {
//                         console.log('error on delete: ' + err)
//                         throw err;
//                     }
//                     console.log(result.result);
//                     res.send({success:true});
                    
//                 });
                
//             } catch (e) 
//             {
//                 console.log('exception: ' + e);
//             }
            
//         })

//     }
// });


// app.listen(port, () => {
//     console.log(`Server started on port `+ port);
// });




//      // update
//      app.put('/api/items/:id', function(req, res)
//      {        
//          try 
//          { 
//             var id = new ObjectId( req.params.id);
//             var newContact = req.body;
            
//             items.update({_id: id}, { $set: newContact }, function(err, results) 
//             {
//                  if(err)
//                  {
//                      console.log('error on delete: ' + err);
//                      throw err;
//                  }
//                  console.log(results.result);
//                  res.send( newContact );
                
//             });
             
//          }catch (e) 
//          {
//              console.log('exception: ' + e);
//          }

//     });
// file serving


// // static file serving
// app.use(express.static('public'));

// // api that receives the requests

// app.get('/home', function(req, res){
//     res.sendFile( cwd + '/public/index.html');
// });




// app.get('/:name', function(req, res){
//     let name = req.params.name;
//     res.send('name: ' + name);
// });

// app.get('/about', function(req, res){
//     res.send('hello from about');
// });







