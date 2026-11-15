
const express = require("express");
const app = express();
const port = 5000;
const sumRouter = require("./router/sum");
const subRouter = require("./router/sub");
const fs = require("fs");



app.use(express.json());

app.use("/sum", sumRouter);

app.use("/sub", subRouter);

app.get("/", (req, res) => {
    const resTxt = fs.readFileSync("history.txt", "utf8");

    res.status(200).send(resTxt);
});


app.delete("/", (req, res) => {
    try {
        fs.unlinkSync("history.txt");

        res.status(200).json({
            message: "history deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});




app.listen(port, () =>{
    console.log(`server is running on ${port}`);
})



