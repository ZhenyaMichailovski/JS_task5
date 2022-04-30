const express = require("express");
const customerController = require("../controllers/customerController.js");
const customerRouter = express.Router();
const jsonParser = express.json();
 
customerRouter.get("/add", customerController.addCustomer);
customerRouter.put("/update/:id", jsonParser, customerController.updateCustomer);
customerRouter.get("/delete/:id", customerController.deleteCustomer);
customerRouter.get("/", customerController.getCustomers);
customerRouter.get("/:id", customerController.getOneCustomer);
 
module.exports = customerRouter;