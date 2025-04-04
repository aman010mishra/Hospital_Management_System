const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    imageUrl: { type: String },
    specialities: { type: [String], required: true },
    rating: { type: Number, default: 0 },
    description: { type: String },
    numDoctors: { type: Number, default: 0 },
    numDepartments: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
