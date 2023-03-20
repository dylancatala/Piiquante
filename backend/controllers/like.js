const { get } = require("mongoose");
const Sauce = require("../models/Sauce");

exports.likeUser = (req, res) => {

  const likeId = parseInt(req.body.like);

  const choice = {
    LIKE: 1,
    DISLIKE: -1,
    RESET: 0,
  }

  //Ajoute +1 like
  if (likeId === choice.LIKE) {
    Sauce.updateOne({ _id: req.params.id },
      {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId }
      }
    )
      .then(() => res.status(201).json({ message: "J'aime ajouté!" }))
      .catch(error => res.status(400).json(error))
  }
  if (likeId === choice.RESET) {
    // Récupérer la sauce
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        console.log(sauce)

        if (sauce.usersLiked.includes(req.body.userId)) {
          sauce.usersLiked = sauce.usersLiked.filter(user => user !== req.body.userId);
          sauce.likes -= 1;
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          sauce.usersDisliked = sauce.usersDisliked.filter(user => user !== req.body.userId);
          sauce.dislikes -= 1;
        }
        sauce.save()
          .then(() => res.status(201).json({ message: "Like / Dislike supprimé" }))
          .catch(error => res.status(400).json(error))
      })
      .catch(error => res.status(400).json(error));

  }
  // Ajoute un -1 dislike
  if (likeId === choice.DISLIKE) {
    Sauce.updateOne({ _id: req.params.id },
      {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId }
      }
    )
      .then(() => res.status(201).json({ message: "J'aime pas ajouté!" }))
      .catch(error => res.status(400).json(error))
  }
}
















