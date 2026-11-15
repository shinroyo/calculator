const express = require("express");
const rounter = express.Router();
const  {sum,sub,mul,div} = require("../calc");

const validateNumbers = require("../modules/number");
const sumSchema = require("../schemes/numscheme");
const fs=require("fs");
const mongoose = require("mongoose");
const calc = require("../modules/calculation");

mongoose.connect("mongodb://localhost:27017/newDatabase")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error(err);
    });


rounter.post("/", async (req,res) =>{

const num1 = req.body.num1;
const num2 = req.body.num2;

  const { error } = sumSchema.validate({
    num1,
    num2
});

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }


    const validation = validateNumbers(num1, num2);

    if (!validation.isValid) {
        return res.status(400).json({
            error: validation.message
        });
    }

const result = sum(num1,num2);


fs.appendFileSync(
    "history.txt",
    `${num1} + ${num2} = ${result}\n`
);

await calc.create({
    num1,
    num2,
    result
});




res.status(201).json({result});


})


module.exports=rounter;