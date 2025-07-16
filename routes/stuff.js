const express = require("express");
const router = express.Router();

const stuffController = require("../controllers/stuff");
const auth = require("../middlewares/auth");

router.get("/", auth, stuffController.getAllThings);

router.post("/", auth, stuffController.createThing);

router.get("/:id", auth, stuffController.findThing);

router.put("/:id", auth, stuffController.updateThing);

router.delete("/:id", auth, stuffController.deleteThing);

module.exports = router;
