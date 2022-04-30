const express = require("express");
const app = express();
const router = require("./routes/ebookRouter.js");
const port = 3000;
app.use(express.urlencoded({extended: true}))
app.set("view engine", "hbs");
app.use("/ebook", router);
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(port, function() {
    console.log(`Server started on port: ${port}`);
});