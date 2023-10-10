const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const encriptedPassword = await bcrypt.hash(password, salt);
    return encriptedPassword;
}

const matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.error(error);
    }
}

const authenticateToken = (req, res, next) => {
    try {
        const { auth } = req.headers;
        let pass = process.env.JWT_USER_KEY
        //Decode the token
        const payload = jwt.verify(auth, pass);
        req.id = payload.email;
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error on auth process' });
    }
    next();
}

module.exports = { encryptPassword, matchPassword,authenticateToken }