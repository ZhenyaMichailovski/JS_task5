const express = require("express");
const port = 3000;
const app = express();
const jsonParser = express.json();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'D:\\учеба\\3 курс\\2 семестр\\РПИ\\lab5_2\\lab5db.db'
});


const Ebook = sequelize.define("Ebooks", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    screenSize: {
        type: Sequelize.STRING,
        allowNull: false
    },
    screenResolution: {
        type: Sequelize.STRING,
        allowNull: false
    },
    screenType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    flashMemory: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

sequelize.sync().then(result => {
    console.log("Create Table");
})
    .catch(err=> console.log(err));


app.get("/ebooks", function(req, res){
    Ebook.findAll({raw:true}).then(orders => {
        res.json(orders);
    }).catch(err=> {
        console.log(err);
        res.sendStatus(404).send();
    });
});

app.get("/ebooks/:id", function(req, res){
    const id = req.params.id;

    Ebook.findByPk(id)
        .then(ebook => {
            if (!ebook) {
                return;
            }
            res.json(ebook);
        }).catch(err=> {
        console.log(err);
        res.sendStatus(404);
    });
});

app.post("/ebooks", jsonParser, function (req, res) {
    if(!req.body) {
        return res.sendStatus(400).send();
    }

    const id = req.body.id;
    const screenSize = req.body.screenSize;
    const screenResolution = req.body.screenResolution;
    const screenType = req.body.screenType;
    const flashMemory = req.body.flashMemory;
    let newEbook = { id: id, screenSize: screenSize, screenResolution: screenResolution,
        screenType: screenType, flashMemory: flashMemory };

    Ebook.create(newEbook).then(responce => {
        res.json("Data has been added.");
    }).catch(err=> {
        console.log(err);
        res.sendStatus(404).send();
    });
});

app.delete("/ebooks/:id", function(req, res){

    const id = req.params.id;

    if(id > 0){
        Ebook.destroy({
            where: {
                id: id
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

app.put("/ebooks", jsonParser, function(req, res){

    if(!req.body) {
        return res.sendStatus(400);
    }

    const id = req.body.id;
    const screenSize = req.body.screenSize;
    const screenResolution = req.body.screenResolution;
    const screenType = req.body.screenType;
    const flashMemory = req.body.flashMemory;
    let item = { id: id, screenSize: screenSize, screenResolution: screenResolution,
                screenType: screenType, flashMemory: flashMemory };

    if(item){
        Ebook.update(item, {
            where: {
                id: id
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