const Hospital = require("../models/Hospital");

const createHospital = async (data) => {
    return await Hospital.create(data);
};

const getHospitalsByCity = async (city) => {
    return await Hospital.find({ city });
};

const deleteHospital = async (id) => {
    return await Hospital.findByIdAndDelete(id);
};

const updateHospital = async (id, data) => {
    return await Hospital.findByIdAndUpdate(id, data, { new: true });
};

const addHospitalDetails = async (id, data) => {
    return await Hospital.findByIdAndUpdate(id, data, { new: true });
};

module.exports = { createHospital, getHospitalsByCity, deleteHospital, updateHospital, addHospitalDetails };
