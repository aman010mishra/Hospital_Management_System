const hospitalService = require("../services/hospitalService");

const createHospital = async (req, res) => {
    try {
        const hospital = await hospitalService.createHospital(req.body);
        res.status(201).json(hospital);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getHospitalsByCity = async (req, res) => {
    try {
        const hospitals = await hospitalService.getHospitalsByCity(req.query.city);
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteHospital = async (req, res) => {
    try {
        await hospitalService.deleteHospital(req.query.id);
        res.status(200).json({ message: "Hospital deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateHospital = async (req, res) => {
    try {
        const hospital = await hospitalService.updateHospital(req.query.id, req.body);
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addHospitalDetails = async (req, res) => {
    try {
        const hospital = await hospitalService.addHospitalDetails(req.query.id, req.body);
        res.status(200).json(hospital);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createHospital, getHospitalsByCity, deleteHospital, updateHospital, addHospitalDetails };
