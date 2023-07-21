const mongoose = require('mongoose');
const User = require('../models/User.js');
const { body, validationResult, cookie } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const userValidation = [
    body('name').isLength({ min: 3 }).withMessage("name should have atleast 3 character"),
    body('email').isEmail().isLength({ min: 10 }).withMessage("email should have atleast 10 character"),
    body('password').isLength({ min: 8 }).withMessage("password must container atleast 8 character")
]

const loginValidation = [
    body('email').isEmail().isLength({ min: 10 }).withMessage("email should have atleast 10 character"),
    body('password').isLength({ min: 8 }).withMessage("password must container atleast 8 character")
]

const register = async (req, res) => {

    await Promise.all(userValidation.map(field => field.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            return res.json({ error: "user with this email already exist!" })
        }

        else {

            const salt = bcryptjs.genSaltSync(10);
            const hashedPassword = bcryptjs.hashSync(String(password), salt)
            const user = new User({
                username: name,
                email: email,
                password: hashedPassword,
            })
            await user.save();

            const data = {
                email: user.email,
                username: user.username,
                id: user.id
            }

            const userDetail = jwt.sign(data,process.env.JWT_SECRET)

            return res.json({ userDetail })
        }
    } catch (error) {
        return res.json({ error: "Internal server error occured!" })
    }
}

const login = async (req, res) => {

    await Promise.all(loginValidation.map(field => field.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({ error: "Please login with correct credentials!" })
    }

    else{

        const isPassword = await bcryptjs.compare(String(password),user.password);
        if(!isPassword){
            return res.json({error:"Please login with correct credentials!"})
        }
        else{

            const data = {
                email: user.email,
                username: user.username,
                id: user.id
            }

            const userDetail = jwt.sign(data,process.env.JWT_SECRET);
            return res.json({userDetail})
        }
    }
}

module.exports = {
    register,
    login
}