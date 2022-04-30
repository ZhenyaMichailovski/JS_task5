const express = require("express");
const app = express();
const customerouter = require("./routes/customerRouter.js");
const port = 3000;

app.set("view engine", "hbs"); 
app.use("/customer", customerouter);;
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
 
app.listen(port, function() {
    console.log(`Server started on port: ${port}`);
});