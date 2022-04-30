const Decimal = require('decimal');
const Sequelize = require("sequelize");
const express = require("express");
const port = 3000;
const app = express();
const jsonParser = express.json();

const sequelize = new Sequelize("computersDB", "root", "28092001Nikita", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
  }
});

const Order = sequelize.define("Orders", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  CustomerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  OrderDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  RepairId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  TotalRepairCost: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  Comment: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

sequelize.sync().then(result => {
    console.log("Create Table");
})
.catch(err=> console.log(err));

//app.use(express.static(__dirname + "/public"));

//Orders
app.get("/orders", function(req, res){
    Order.findAll({raw:true}).then(orders => {
        res.json(orders);
    }).catch(err=> {
          console.log(err);
          res.sendStatus(404).send();
    });
});

app.get("/orders/:id", function(req, res){
    const id = req.params.id;

    Order.findByPk(id)
    .then(order => {
        if (!order) {
            return;
        }

        res.json(order);
    }).catch(err=> {
        console.log(err);
        res.sendStatus(404);
    });
});

app.post("/orders", jsonParser, function (req, res) {
    if(!req.body) {
        return res.sendStatus(400).send();
    }

    const customerId = req.body.CustomerId;
    const orderDate = req.body.OrderDate;
    const repairId = req.body.RepairId;
    const totalRepairCost = req.body.TotalRepairCost;
    const comment = req.body.Comment;
    let newOrder = { CustomerId: customerId, OrderDate: orderDate, RepairId: repairId, TotalRepairCost: totalRepairCost, Comment: comment };
    
    Order.create(newOrder).then(responce => {
        res.json("Data has been added.");
    }).catch(err=> {
        console.log(err);
        res.sendStatus(404).send();
    });
});

app.delete("/orders/:id", function(req, res){
       
    const id = req.params.id;

    if(id > 0){
        Order.destroy({
            where: {
              Id: id
            }
        }).then((res) => {
            res.json("Data has been deleted.");
        }).catch(err=> {
            console.log(err);
            res.sendStatus(404).send();
        });
    }
    else{
        res.status(404).send();
    }
});

app.put("/orders", jsonParser, function(req, res){
       
    if(!req.body) {
        return res.sendStatus(400);
    }

    const id = req.body.Id;
    const customerId = req.body.CustomerId;
    const orderDate = req.body.OrderDate;
    const repairId = req.body.RepairId;
    const totalRepairCost = req.body.TotalRepairCost;
    const comment = req.body.Comment;
    let updatedOrder = { CustomerId: customerId, OrderDate: orderDate, RepairId: repairId, TotalRepairCost: totalRepairCost, Comment: comment };    
    
    if(updatedOrder){
        Order.update(updatedOrder, {
            where: {
                Id: id
            }
        }).then((responce) => {
            res.json("Data has been updated.");
        }).catch(err=> {
            console.log(err);
            res.sendStatus(404).send();
        });
    }
    else{
        res.status(404).send();
    }
});
   
app.listen(port, function(){
    console.log(`Server started on port: ${port}`);
});

module.exports = app;