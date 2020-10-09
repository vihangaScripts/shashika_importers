var mysql = require('mysql');
var db;
var settings = {

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spareparts_db'
}

function connectDatabase() {

    if(!db) {

        db = mysql.createConnection(settings);

        db.connect(function(err){

            if(!err){

                    console.log("Database connected");

            }
            else{

                console.log("connection lost");

            }


        })

    }

    return db;
}

module.exports = connectDatabase();