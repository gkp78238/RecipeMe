const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();

const User = require('../../models/User');

router.get('/:id',(req, res) => {
    User.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json({ error: 'No user found' }));
});

router.get('/',(req, res) => {
    User.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json({ noitemsfound: 'No users found' }));
});

router.post('/', bodyParser.json(), (req, res) => {
    User.create(req.body)
    .then((item) => res.json({ msg: 'User added successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this user' }));
});

router.put('/:id',bodyParser.json(),(req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: 'User updated successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Unable update this user' }));
});

router.delete('/:id',(req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((item) => res.json({ msg: 'User deleted successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Unable delete this user' }));
});

module.exports = router;