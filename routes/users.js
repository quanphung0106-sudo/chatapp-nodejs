const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//[PUT] /api/users/:id
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            };
        };
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        };
    } else {
        return res.status(403).json("You can only update your account");
    };
});

//[DELETE] /api/users/:id
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne({_id: req.params.id});
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        };
    } else {
        return res.status(403).json("You can only delete your account");
    };
});

//[GET] /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, createdAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    };
});


// follow user
// unfollow user

module.exports = router;