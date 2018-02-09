
const express    = require('express');
const path       = require('path');
const mysql      = require('mysql');
const bodyParser = require('body-parser')
/*
const index = require('./routes/index');
const todos = require('./routes/todos');
const familyMembers = require('./routes/familyMembers');
*/

const port = 2016;

app = express();

const cwd = process.cwd();

// db connect 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'family_todo'
});

connection.connect(function(err) {
    if (err)
    {
        console.log('Error connecting mysql db: ' + err);
        throw err
    } 
    console.log('Connected to mysql database')
})


// static file serving

app.use(express.static(path.join(__dirname, 'client'))); //client
app.use(bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies


// Create node.js express server to listen for client requests

const server = app.listen(3000, "127.0.0.1", function () 
{
    const host = server.address().address
    const port = server.address().port
  
    console.log("FamilyToDo Server is running on http://%s:%s", host, port)
  
});

// Send main page on general request

app.get('/', function(req,res){
    res.sendFile(cwd+'/client/index.html')
})

// Node.js Rest Api (using mysql)
/////////////////////////////////

// Get all tasks (joined with family members to get family member name)

app.get('/tasks', function (req, res) {
    let joinQuesy =`
    SELECT tasks.id, tasks.description, tasks.date, tasks.family_member_id, family_members.name FROM tasks INNER JOIN family_members ON tasks.family_member_id=family_members.id`;

    connection.query( joinQuesy, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

    //rest api to delete record from mysql database
    app.delete('/tasks', function (req, res) { //TODO: FIX
    console.log(req.body);
    connection.query('DELETE FROM `tasks` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });

 app.post('/tasks', function (req, res) {
    // var params  = JSON.parse( req.body);
    // console.log(params);
    connection.query('INSERT INTO tasks SET ?', req.body, function (error, results, fields) {
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


 











