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
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price,
  });

  thing
    .save()
    .then(() => {
      res.status(201).json({ message: "Saved Succesfully" });
    })
    .catch((error) => {
      res.status(400).json({ error });
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


module.exports.deleteThing = (req,res,next)=>{
    Thing.deleteOne({_id:req.params.id})
    .then(()=>{
        res.status(200).json({message:"Deleted"})
    })
    .catch((error)=>{
        res.status(400).json({error})
    })
}