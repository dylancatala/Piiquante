const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const helmet = require("helmet");
const app = express();


// Connexion à MongoDBD
mongoose
  .connect("mongodb://localhost/sauces", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));



// Cors Privacy, autorisations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


app.use(express.json());

// Protection de l'entête HTTP pour éviter des intrusions malhônnetes 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));




module.exports = app;
