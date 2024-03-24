const router = require('express').Router();
const delete_model = require('../models/deleteUser_model');

router.delete("/", async (req, res) => {
    try {
        const data = await delete_model.deleteUser(req.body.username);
        res.status(200).json(data);
    } catch (error) {
        res.sendStatus(500).json(error);
    }
});

module.exports = router;