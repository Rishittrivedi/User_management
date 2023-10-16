const mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

function getactiveUser(req,res){
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
        if (!err) {
          let removedUser = req.query.removed;
          res.render('home', { rows, removedUser });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
}

function findUser(req,res){
    let searchTerm = req.body.search;
    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

function createUser(body,res){
    const { first_name, last_name, email, phone, comments, address, college} = body;
    let searchTerm = body.search;

    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?, address = ?, college = ?', [first_name, last_name, email, phone, comments, address, college], (err, rows) => {
        if (!err) {
          res.render('add-user', { alert: 'User added successfully.' });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
}

function editUser(req,res){
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('edit-user', { rows });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
}

function updateUser(req,res){
    const { first_name, last_name, email, phone, comments, address, college} = req.body;
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?, address = ?, college = ? WHERE id = ?', [first_name, last_name, email, phone, comments, address, college, req.params.id], (err, rows) => {

    if (!err) {
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

function deleteUser(req,res){
    connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
        if (!err) {
          let removedUser = encodeURIComponent('User successeflly removed.');
          res.redirect('/?removed=' + removedUser);
        } else {
          console.log(err);
        }
        console.log('The data from beer table are: \n', rows);
      });
}

function viewall(req,res){
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('view-user', { rows });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
}

module.exports = {getactiveUser, findUser, createUser, editUser, updateUser, deleteUser, viewall}