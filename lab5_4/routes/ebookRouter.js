const express = require("express");
const controller = require("../controllers/ebookController.js");
const router = express.Router();
const jsonParser = express.json();

router.get("/create", controller.showEbookToCreate);
router.post("/create", controller.addEbook)
router.get("/edit/:id", controller.getEbookById)
router.post("/edit/:id", controller.updateEbook);
router.post("/delete/:id", controller.deleteEbook);
router.get("/", controller.getEbooks);

module.exports = router;