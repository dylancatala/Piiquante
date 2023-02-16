const sauceModel = require('../models/Sauce');
const fs = require('fs');
const path = require('path');

///Création d'une sauce
exports.createSauce = (req, res, next) => {
  const SauceObject = JSON.parse(req.body.sauce);
  delete SauceObject._id;
  delete SauceObject._userId;
  const sauceRecord = new sauceModel({
    ...SauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauceRecord.save()
    .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
    .catch(error => { res.status(400).json({ error }) })
};

///Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const SauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete SauceObject._userId;
  sauceModel.findOne({ _id: req.params.id })
    .then((sauceRecord) => {
      if (sauceRecord.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const imageParsed = path.parse(sauceRecord.imageUrl);
        fs.unlinkSync(path.join('images', imageParsed.base));
        sauceModel.updateOne({ _id: req.params.id }, { ...SauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  sauceModel.findOne({ _id: req.params.id })
    .then(sauceRecord => {
      if (sauceRecord.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const imageParsed = path.parse(sauceRecord.imageUrl);
        fs.unlink(path.join('images', imageParsed.base), () => {
          sauceModel.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Sauce supprimée !' }) })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

//Récupérer une sauce
exports.getOneSauce = (req, res, next) => {
  sauceModel.findOne({ _id: req.params.id })
    .then(sauceRecord => res.status(200).json(sauceRecord))
    .catch(error => res.status(404).json({ error }));
};

//Récupérer toutes les sauces
exports.getAllSauce = (req, res, next) => {
  sauceModel.find()
    .then(sauceRecord => res.status(200).json(sauceRecord))
    .catch(error => res.status(400).json({ error }));
};