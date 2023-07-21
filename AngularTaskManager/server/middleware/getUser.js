const jwt = require('jsonwebtoken')
require('dotenv').config();

const getUser = (req, res, next) => {
    const userDetails = req.header('userDetails')
    if (!userDetails) {
        res.json({ error: "Access denied!" })
    }
    try {
        const data = jwt.verify(userDetails,process.env.JWT_SECRET)
        req.id = data.id
        next()
    } catch (error) {
        res.json({ error})
    }
}

module.exports = getUser;

