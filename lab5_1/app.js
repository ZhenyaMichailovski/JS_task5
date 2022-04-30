const express = require("express");
const db = require("./database.js")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/ebooks", function(req, res, next){

    let sql = "select * from ebooks"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});
// получение одного пользователя по id
app.get("/api/ebooks/:id", function(req, res, next){

    let sql = "select * from ebooks where id = ?"
    let params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

app.post("/api/ebook/", (req, res, next) => {
    let errors=[]
    if (!req.body._screenSize){
        errors.push("No screen size specified");
    }
    if (!req.body._screenResolution){
        errors.push("No screen resolution specified");
    }
    if (!req.body._screenType){
        errors.push("No screen type specified");
    }
    if (!req.body._flashMemory){
        errors.push("No flash memory specified");
    }
    let data = {
        screenSize: req.body._screenSize,
        screenResolution: req.body._screenResolution,
        screenType : req.body._screenType,
        flashMemory : req.body._flashMemory
    }
    let sql ='INSERT INTO ebooks (ScreenSize, ScreenResolution, ScreenType, FlashMemory) VALUES (?,?,?,?)'
    let params =[data.screenSize, data.screenResolution, data.screenType, data.flashMemory]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.id
        })
    });
})

// удаление пользователя по id
app.delete("/api/ebooks/:id", function(req, res){

    db.run(
        'DELETE FROM ebooks WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
        });
});
// изменение пользователя
app.put("/api/ebook/:id", function(req, res, next){

    let data = {
        screenSize: req.body._screenSize,
        screenResolution: req.body._screenResolution,
        screenType : req.body._screenType,
        flashMemory : req.body._flashMemory
    }
    db.run(
        `UPDATE ebooks set 
           ScreenSize = COALESCE(?,name), 
           ScreenResolution = COALESCE(?,email), 
           ScreenType = COALESCE(?,password),
           FlashMemory
           WHERE Id = ?`,
        [data.screenSize, data.screenResolution, data.screenType, data.flashMemory, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
        });
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});