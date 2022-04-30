const Ebook = require("../models/ebookModel");
const bodyParser = require("body-parser");

exports.getEbooks = function(req, res) {
    Ebook.findAll({raw: true}).then(ebooks => {
        res.render("../views/index.hbs", {
            ebooks: ebooks
        });
    });
};

exports.showEbookToCreate = function (req, res) {
  res.render("../views/create.hbs")
};
exports.addEbook = function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const _screenSize = req.body.screenSize;
    const _screenResolution = req.body.screenResolution;
    const _screenType = req.body.screenType;
    const _flashMemory = req.body.flashMemory;
    let item = { screenSize: _screenSize, screenResolution: _screenResolution,
        screenType: _screenType, flashMemory: _flashMemory };
    Ebook.create(item).then(responce => {
        res.redirect("/ebook")
    }).catch(err=> {
        console.log(err);
        res.sendStatus(404).send();
    });
};



exports.deleteEbook = function (req, res) {
    if(req.params.id > 0){
        Ebook.destroy({
            where: {
                Id: req.params.id
            }
        }).then((responce) => {
            res.redirect("/ebook");
        }).catch(err=> {
            console.log(err);
            res.sendStatus(404).send();
        });
    }
    else{
        res.status(404).send();
    }
};


exports.getEbookById = function(req, res) {
    Ebook.findOne( {
        where: {
            id: req.params.id
        },
        raw: true
    })
        .then(ebook => {
            res.render("../views/edit.hbs", {
                ebook: ebook
            });
        });
};

exports.updateEbook = function (req, res) {
    console.log(req.body)
    const id = req.body.id;
    const screenSize = req.body.screenSize;
    const screenResolution = req.body.screenResolution;
    const screenType = req.body.screenType;
    const flashMemory = req.body.flashMemory;

    Ebook.update({ id: id, screenSize: screenSize, screenResolution: screenResolution,
        screenType: screenType, flashMemory: flashMemory }, {
        where: {
            id: id
        }}).then(() => {
        res.redirect("/ebook");
    }).catch(err=> {
        console.log(err);
        res.sendStatus(404).send();
    });
};