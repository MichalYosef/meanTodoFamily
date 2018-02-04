const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const express = require('express');
const bodyParser = require('body-parser')
app = express();

const port = 2016;
const connectionString = 'mongodb://localhost:27017/todo';
var cwd = process.cwd();

app.use( bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json())

app.get('/', function(req,res){
    res.sendFile(cwd+'/public/index.html')
})

mongo.connect(connectionString, function(err, dbParent)
{
    if(err) console.log('cannot connect ' + err.message);
    else
    {
        // get reference to db collection
        const myDb = dbParent.db('todo');
        const items = myDb.collection('items');
        const family = myDb.collection('family');

           // Family api

        // insert
        app.post('/api/family', function(req, res)
        {
            let newItem = req.body;
    
            items.insert( newItem, function(err, result){
                if(!err) res.send( newItem);
                else throw(err)
    
            })
            
        });

        // get
        app.get('/api/family', function(req, res){
            items.find().toArray( function(err, result){
                res.send(result)
            })
        })

        // delete
        app.delete('/api/family/:id', function(req, res)
        {        
            try 
            {
                var id = new ObjectId( req.params.id);

                // let deleteResult = 
                items.deleteOne({_id: id}, function(err, result) 
                {
                    if(err)
                    {
                        console.log('error on delete: ' + err)
                        throw err;
                    }
                    console.log(result.result);
                    res.send({success:true});
                    
                });
                
            } catch (e) 
            {
                console.log('exception: ' + e);
            }
            
        })

    
        // Items api

        // insert
        app.post('/api/items', function(req, res)
        {
            let newItem = req.body;
    
            items.insert( newItem, function(err, result){
                if(!err) res.send( newItem);
                else throw(err)
    
            })
            
        });

        // get
        app.get('/api/items', function(req, res){
            items.find().toArray( function(err, result){
                res.send(result)
            })
        })

        // delete
        app.delete('/api/items/:id', function(req, res)
        {        
            try 
            {
                var id = new ObjectId( req.params.id);

                // let deleteResult = 
                items.deleteOne({_id: id}, function(err, result) 
                {
                    if(err)
                    {
                        console.log('error on delete: ' + err)
                        throw err;
                    }
                    console.log(result.result);
                    res.send({success:true});
                    
                });
                
            } catch (e) 
            {
                console.log('exception: ' + e);
            }
            
        })

    }
});


app.listen(port, () => {
    console.log(`Server started on port `+ port);
});




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







