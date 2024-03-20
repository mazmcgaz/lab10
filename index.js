require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require('mysql2');

const PORT = process.env.PORT || 4000;
app.set('view engine', 'ejs');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:10,
    port: process.env.DB_PORT,
    multipleStatements: true
});


connection.getConnection((err)=>{
    if(err) return console.log(err.message);
    console.log("connected to local mysql db using .env properties");
});



// 1. DISPLAY * BURGERS
// building the API GET method
app.get('/burgers', (req, res)=> { 

    let allburgers = `SELECT *
                       FROM rest_menu`;
    connection.query(allburgers, (err, data) => {  
        if(err) throw err;
        res.json({data});
    });

});

// OLD CODE
// app.get('/burgers', (req, res)=> { 
//     res.json({data : "list of burgers", info : "request successful"});
// });



// 2. FILTERING BURGER INFORMATION
// The /:rowid is a path parameter placeholder. So the URL 
//can contain extra data that will be pushed into the SQL query.
app.get('/burgers/:rowid', (req, res) => { 
    let r_id = req.params.rowid;
    let getburger = `SELECT *
                       FROM rest_menu WHERE id=${r_id}`;
    connection.query(getburger, (err, data) => {  
        if(err) throw err;
        res.json({data});
    });

});




const server = app.listen(PORT, () => {
    console.log(`API started on port ${server.address().port}`);
});






