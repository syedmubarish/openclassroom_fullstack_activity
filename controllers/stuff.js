const Thing = require("../models/things");

module.exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports.createThing = (req, res, next) => {
  console.log(req.body);
  req.body.thing = JSON.parse(req.body.thing);

  const url = req.protocol + "://" + req.get("host");
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + "/images/" + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

module.exports.findThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

module.exports.updateThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(200).json({
        message: "Updated Succesfully",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

module.exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    if (!thing) {
      return res.status(404).json({ error: new Error("Not found ") });
    }
    if (thing.userId !== req.auth.userId) {
      return res
        .status(401)
        .json({ error: new Error("Unauthorized activity") });
    }

    Thing.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Deleted" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
};
