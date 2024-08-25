const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');


const app = express();

// CORS
app.use(cors())

// Middleware to parse JSON request bodies
app.use(express.json())
app.use(bodyParser.json());

const PORT = 5000

// Get All Students
app.get('/students', function(request, response) {
    const query = 'SELECT * FROM students';
    db.query(query, function(error, data) {
        if(error) {
            return response.json(error);
        }
        else {
            return response.json(data);
        }
    });
});

// Get Student By 
app.get('/students/:id', function(request, response) {
    const id = request.params.id;
    const query = `SELECT * FROM students WHERE id = ?`;
    db.query(query, [id], function(error, data) {
        if(error) {
            return response.json(error);
        }
        else {
            return response.json(data);
        }
    });
});

// Add a Student
app.post('/students', function(request, response) {
    const {firstname, lastname, email, password} = request.body;

    // Generate ID
    const max = 999;
    const min = 1;
    const numb = Math.floor(Math.random() * (max - min  + 1) + min);
    const currentYear = new Date().getFullYear().toString();
    const id = lastname.charAt(0) + firstname.charAt(0) + currentYear.slice(-2) + numb;

    // Prepare Data
    const student = [id, firstname, lastname, email, password];

    const query = 'INSERT INTO students(id, firstname, lastname, email, password) VALUES(?)';
    db.query(query, [student], function(error, data) {
        if(error) {
            return response.json({message: error.message});
        }
        else {
            return response.json({status: response.status, data: student});
        }
    });
});

// Update a Student
app.put('/students/:id', function(request, response) {
    const studentId = request.params.id;
    const { ID: id, FIRSTNAME: firstname, LASTNAME: lastname, EMAIL: email, PASSWORD: password } = request.body;
    const student = [firstname, lastname, email, password, studentId];
    console.log(student);
    const query = 'UPDATE students SET firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, student, function(error, data) {
        if(error) {
            return response.json({message: error.message});
        }
        else {
            return response.json(data);
        }
    });
});

// Delete All
app.delete('/students', function(request, response) {
    const query = 'DELETE FROM students';
    db.query(query, function(error, data) {});
});

// Delete a Student by ID
app.delete('/students/:id', function(request, response) {
    const studentId = request.params.id;
    const query = 'DELETE FROM students WHERE ID = ?';
    db.query(query, [studentId], function(error, data) {
        if(error) return response.json(error);
        return response.json(data);
    });
})

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});