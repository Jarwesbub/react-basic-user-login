const router = require('express').Router();
const login = require('../models/login_model');
const bcrypt = require('bcryptjs-react');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            throw 'Undefined username or password';
        };

        let result = await login.userLogin(req.body.username).then(function (resp) {
            return resp[0];
        });

        bcrypt.compare(req.body.password, result.password, (err, resp) => {
            if (err) throw err;
            else if (!resp && req.body.password !== result.password) {
                res.status(400).send({ code: 1, message: 'Password is incorrect' });
                console.log(req.body.password+"="+result.password);
                return;
            };

            const maxAge = 86400; // 86400 = 1day
            const payload = {
                username: result.username,
                email: result.email,
                cookieMaxAge: maxAge,
                httpOnly: false,
                secure: false
            }
            const options = {
                expiresIn: maxAge,
            }
            const newToken = jwt.sign(payload, process.env.JWT_TOKEN, options);
            console.log("token: " + newToken);

            res.status(200).send({ code: 0, message: 'User logged in successfully', token: newToken });
            console.log("Password is correct");

        });
    } catch (error) {
        if (error instanceof (TypeError)) {
            res.status(400).send({ code: 2, message: 'Username was not found' });
            return;
        }
        res.status(400).send({ code: 3, message: error });
    }
});

module.exports = router;