const Sauce = require('../models/Sauce');
const fs = require('fs');



exports.createSauce = (req, res, next) => {
  const SauceObject = JSON.parse(req.body.sauce);
  delete SauceObject._id;
  delete SauceObject._userId;
  const sauce = new Sauce({
    ...SauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
    .catch(error => { res.status(400).json({ error }) })
};


exports.modifySauce = (req, res, next) => {
  const SauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete SauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((Sauce) => {
      if (Sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...SauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifié!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(Sauce => {
      if (Sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = Sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Sauce supprimé !' }) })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};


exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(Sauce => res.status(200).json(Sauce))
    .catch(error => res.status(404).json({ error }));
};


exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(Sauce => res.status(200).json(Sauce))
    .catch(error => res.status(400).json({ error }));
};