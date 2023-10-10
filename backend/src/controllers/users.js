//Imports
const { matchPassword, encryptPassword } = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/usersSchema');
const { create_UUID } = require('../utils/utils');

//Register
const register = async (req, res) => {
    const { email, firstname, lastname, password, role } = req.body;
    // Checks if user already exist in database
    const user = await User.find({ email: email });
    if (user.length !== 0) {
        return res.status(409).json({ message: 'User already registered' })
    }
    // If user doesn't exist in database, then create the user
    try {
        const id = create_UUID()
        const encryptedPass = await encryptPassword(password)
        const newUser = new User({ id: id, firstname, lastname, email, password: encryptedPass, role });
        const savedUser = await newUser.save();
        if (Object.keys(savedUser).length !== 0) {
            const token = await createjwt(email);
            return res.status(200).json({ token, message: 'User correctly registered' });
        }
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: 'Error on register process' })
    }
};

//Login
const login = async (req, res) => {
    const { email, password } = req.body;
    // Checks if user already exist in database
    const user = await User.find({ email: email });
    if (user.length === 0) {
        return res.status(404).json({ message: 'User not registered' })
    }
    try {
        const checkPassword = await matchPassword(password, user[0].password)
        if (!checkPassword) {
            return res.status(401).json({ message: 'Contraseña no coincide' })
        } else {
            const token = await createjwt(email)
            return res.status(200).json({ token, message: 'User correctly logged' })
        }
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: 'Error on login process' })
    }
}

const createjwt = async (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_USER_KEY, { expiresIn: process.env.JWT_USER_EXPIRES });
    return token;
}

module.exports = { register, login, createjwt };