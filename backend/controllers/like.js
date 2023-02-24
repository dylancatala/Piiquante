const { get } = require("mongoose");
const Sauce = require("../models/Sauce");

exports.likeUser = (req, res) => {

  const likeId = parseInt(req.body.like);

  //Ajoute +1 like si la personne aime 
  if (likeId === 1) {
    Sauce.updateOne({ _id: req.params.id },
      {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId }
      }
    )
      .then(() => res.status(201).json({ message: "J'aime ajouté!" }))
      .catch(error => res.status(400).json(error))
  }

  // Ajoute + 1 like si la personne aime
  if (likeId === -1) {
    Sauce.updateOne({ _id: req.params.id },
      {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId }
      }
    )
      .then(() => res.status(201).json({ message: "J'aime pas ajouté!" }))
      .catch(error => res.status(400).json(error))
  }


  //Retire le like
  if (likeId === 0) {


    Sauce.updateOne({ _id: req.params.id },
      {
        $inc: { likes: -1 },
        $pull: { usersLiked: req.body.userId, usersDisliked: req.body.userId }
      }
    )
      .then(() => res.status(201).json({ message: "J'aime retiré!" }))
      .catch(error => res.status(400).json(error))
  }
}
















