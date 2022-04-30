import mysql from "mysql2";
import fs from "fs"
import express from "express"
const port = 3000;
const app = express();
const jsonParser = express.json();

const connection = mysql.createConnection(JSON.parse(fs.readFileSync("./pathToDB.json")));

connection.connect(function(err){
    if (err) {
        console.error(err.message);
    }
});

//app.use(express.static(__dirname + "/public"));

//Customers
app.get("/customers", async function(req, res){
    connection.query("SELECT * FROM Customers", function(err, results, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });
});

app.get("/customers/:id", function(req, res){
    const id = req.params.id;

    connection.query(`SELECT * FROM Customers Where Id=${id}`, function(err, results, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    });
});

app.post("/customers", jsonParser, function (req, res) {
    if(!req.body) {
        return res.sendStatus(400);
    }

    const id = req.body.Id;
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const age = req.body.Age;
    const phone = req.body.Phone;
    const customerAddress = req.body.CustomerAddress;
    const customerStatus = req.body.CustomerStatus;
    let newCustomer = { Id: id, FirstName: firstName, LastName: lastName, Age: age, Phone: phone, CustomerAddress: customerAddress, CustomerStatus: customerStatus };
    
    connection.query(`INSERT INTO Customers (Id, FirstName, LastName, Age, Phone, CustomerAddress, CustomerStatus) values (${id}, '${newCustomer.FirstName}', '${newCustomer.LastName}', ${newCustomer.Age}, '${newCustomer.Phone}', '${newCustomer.CustomerAddress}', '${newCustomer.CustomerStatus}')`, function(err, results, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Data has been added.");
        }
    });
});

app.delete("/customers/:id", function(req, res){
       
    const id = req.params.id;

    if(id > 0){
        connection.query(`Delete From Customers Where Id=${id}`, function(err, results, fields) {
            if (err) {
                console.log(err);
            }
            else{
                res.send("Data has been deleted.");
            }
        });
    }
    else{
        res.status(404).send();
    }
});

app.put("/customers", jsonParser, function(req, res){
       
    if(!req.body) {
        return res.sendStatus(400);
    }

    const id = req.body.Id;
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const age = req.body.Age;
    const phone = req.body.Phone;
    const customerAddress = req.body.CustomerAddress;
    const customerStatus = req.body.CustomerStatus;
    let updatedCustomer = { Id: id, FirstName: firstName, LastName: lastName, Age: age, Phone: phone, CustomerAddress: customerAddress, CustomerStatus: customerStatus };

    if(updatedCustomer){
        connection.query(`Update Customers Set FirstName = '${updatedCustomer.FirstName}', LastName = '${updatedCustomer.LastName}', Age = '${updatedCustomer.Age}', Phone = '${updatedCustomer.Phone}', CustomerAddress = '${updatedCustomer.CustomerAddress}', CustomerStatus = '${updatedCustomer.CustomerStatus}' Where Id=${updatedCustomer.Id}`, function(err, results, fields) {
            if (err) {
                console.log(err);
            }
            else{
                res.send("Data has been updated.");
            }
        });
    }
    else{
        res.status(404).send(order);
    }
});
   
app.listen(port, function(){
    console.log(`Server started on port: ${port}`);
});