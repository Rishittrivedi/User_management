const {getactiveUser, findUser, createUser, editUser, updateUser, deleteUser, viewall} = require('../model/model');

exports.view = (req, res) => {
  getactiveUser(req,res)
}

exports.find = (req, res) => {
  findUser(req,res)
}

exports.form = (req, res) => {
  res.render('add-user');
}

exports.create = (req, res) => {
  createUser(req.body, res)
}

exports.edit = (req, res) => {
  editUser(req,res)
}

exports.update = (req, res) => {
  updateUser(req,res)
}

exports.delete = (req, res) => {
  deleteUser(req,res)
}

exports.viewall = (req, res) => {
  viewall(req,res)
}