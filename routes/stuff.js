const express = require("express");
const router = express.Router();

const stuffController = require("../controllers/stuff");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.get("/", auth, stuffController.getAllThings);

router.post("/", auth, multer, stuffController.createThing);

router.get("/:id", auth, stuffController.findThing);

router.put("/:id", auth, multer, stuffController.updateThing);

router.delete("/:id", auth, stuffController.deleteThing);

module.exports = router;
