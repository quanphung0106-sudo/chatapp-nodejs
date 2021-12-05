const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//[POST]: /register
router.post('/register', async function (req, res) {
    
    try{
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json(err);

    };
});

module.exports = router;