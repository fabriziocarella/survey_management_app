//Imports
const Survey = require('../models/surveysSchema');
const { create_UUID } = require('../utils/utils');

//Register
const createSurvey = async (req, res) => {
    const { dni, product, subProductA, subProductB, maintenanceA, maintenanceB, status } = req.body;
    try {
        const id = create_UUID()
        const newSurvey = new Survey({ id, author: req.id, dni, product, subProductA, subProductB, maintenanceA, maintenanceB, status });
        const createdSurvey = await newSurvey.save();
        if (Object.keys(createdSurvey).length !== 0) {
            return res.status(200).json({ message: 'Survey correctly created' });
        }
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: 'Error on creation process' })
    }
};

module.exports = { createSurvey };