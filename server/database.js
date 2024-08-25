const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
});

db.connect(function(error) {
    if(error) {
        console.log(error);
    }
    else {
        console.log('Connected to MySQL');
    }
});


// Export db variable
module.exports = db;