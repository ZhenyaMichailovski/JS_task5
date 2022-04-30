import mysql from "mysql2";
import fs from "fs"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ComputersDB",
    password: "28092001Nikita"
});

export default class Customer {
    constructor(id, firstName, lastName, age, phone, customerAddress, customerStatus) {
        this.Id = id,
        this.FirstName = firstName,
        this.LastName = lastName,
        this.Age = age,
        this.Phone = phone,
        this.CustomerAddress = customerAddress,
        this.CustomerStatus = customerStatus
    }

    Create(newCustomer) {
        connection.connect(function(err){
            if (err) {
                console.error(err.message);
            }
            else{
                console.log("Подключение к серверу MySQL успешно установлено");
            }
        });

        newOrder.Id = Math.max.apply(Math, GetAll().map(function(i) { return i.id; })) + 1;

        db.serialize(() => {
            db.each(`INSERT INTO Orders (Id, CustomerId, OrderDate, RepairId, TotalRepairCost, Comment) value (${newOrder.Id}, ${newOrder.CustomerId}, ${newOrder.OrderDate}, ${newOrder.RepairId}, ${newOrder.TotalRepairCost}, ${newOrder.Comment})`, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }

    Delete(id) {
        let db = new sqlite.Database(pathToDB, sqlite.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
        });

        db.serialize(() => {
            db.each(`Delete From Orders Where Id=${id}`, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }

    Update(newOrder) {
        let db = new sqlite.Database(pathToDB, sqlite.OPEN_READWRITE, (err) => {
            if (err) {
                console.error(err.message);
            }
        });

        db.serialize(() => {
            db.each(`Update Orders Set CustomerId = ${newOrder.CustomerId}, OrderDate = ${newOrder.OrderDate}, RepairId = ${newOrder.RepairId}, TotalRepairCost = ${newOrder.TotalRepairCost}, Comment = ${newOrder.Comment} Where Id=${newOrder.Id}`, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }

    GetAll() {
        connection.connect(function(err){
            if (err) {
                console.error(err.message);
            }
        });

        let data;
        connection.query("SELECT * FROM Customers", function(err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                //data = results;
                
            }
            data = results
            //console.log(data);
        });

        console.log(results);

        connection.end(function(err) {
            if (err) {
                console.log(err.message);
            }
        });
    }

    GetById(id) {
        let data;
        db.serialize(() => {
            db.each(`SELECT * FROM Orders where Id=${id}`, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                else {
                    data = row;
                }
            });
        });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
        });

        return data;
    }
}