const router = require('express').Router();
const signUp = require('../models/signUp_model');

router.post('/', async (req, res) => {
    try {
        if(!req.body.username || !req.body.password || !req.body.email) {
            throw "Undefined username, password or email";
        }

        const data = await signUp.createUser(req.body.username, req.body.password, req.body.email);
        res.status(200).json("User created succesfully");
    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = router;