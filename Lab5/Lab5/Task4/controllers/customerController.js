const Customer = require("../models/customerModel");

exports.getCustomers = function(req, res) {
    Customer.findAll({raw: true}).then(customers => {
        res.render("../views/showCustomers.hbs", {
            customers: customers
        });
    });       
};

exports.getOneCustomer = function(req, res) {
    Customer.findOne( {
        where: {
            id: req.params.id
        },
        raw: true
    })
    .then(customer => {
        res.render("../views/showCustomers.hbs", {
            customer: customer
        });
    });
};

exports.addCustomer = function (req, res) {
    res.render("../views/addCustomer.hbs", {});
};

exports.updateCustomer = function (req, res) {

    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const age = req.body.Age;
    const phone = req.body.Phone;
    const customerAddress = req.body.CustomerAddress;
    const customerStatus = req.body.CustomerStatus;
    
    let updatedCustomer = {
        FirstName: firstName,
        LastName: lastName,
        Age: age,
        Phone: phone,
        CustomerAddress: customerAddress,
        CustomerStatus: customerStatus
    }

    Customer.update(updatedCustomer, {
    where: {
        Id: req.params.id
    }})
    .then(() => {
        res.redirect("/customer");
    });   
};

exports.deleteCustomer = function (req, res) {
    if(req.params.id > 0){
        Customer.destroy({
            where: {
              Id: req.params.id
            }
        }).then((responce) => {
            res.redirect("/customer");
        }).catch(err=> {
            console.log(err);
            res.sendStatus(404).send();
        });
    }
    else{
        res.status(404).send();
    }
};