const router = require('express').Router();

router.get('/', function (req, res) {
    res.send('Welcome to auth route');
})

module.exports = router;