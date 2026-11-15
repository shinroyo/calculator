const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema({
    num1: Number,
    num2: Number,
    result: Number
});

module.exports = mongoose.model(
    "Calculation",
    calculationSchema
);