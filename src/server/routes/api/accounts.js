const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const bcryptjs = require('bcryptjs')

const Account = require('../../models/Account');

router.get('/:id',(req, res) => {
    Account.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json({ error: 'No account found' }));
});

router.get('/',(req, res) => {
    Account.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json({ noaccountsfound: 'No accounts found' }));
});

router.post('/', bodyParser.json(), (req, res) => {
    bcryptjs.hash(req.body.password, 8)
    .then((hashed) => {
        req.body.password = hashed;
        
        Account.create(req.body)
        .then((item) => res.json({ msg: 'Account created successfully!' }))
        .catch((err) => res.status(400).json({ error: 'Unable to add this account' }))}
    );
});

router.post('/login', bodyParser.json(), (req, res) => {
    Account.findOne({name: req.body.name})
    .then((item) => {
        bcryptjs.compare(req.body.password, item.password)
        .then((isMatch) => {
            if (isMatch) res.json(item)
            else res.status(400).json({ msg: 'Incorrect password' })}
        )
    })
    .catch((err) => res.status(400).json({ noaccountsfound: 'Unable to find account' }));
});

router.put('/:id',bodyParser.json(),(req, res) => {
    Account.findByIdAndUpdate(req.params.id, req.body)
    .then((item) => res.json({ msg: 'Account updated successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Unable update this account' }));
});

router.delete('/:id',(req, res) => {
    Account.findByIdAndDelete(req.params.id)
    .then((item) => res.json({ msg: 'Account deleted successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Unable delete this account' }));
});

module.exports = router;