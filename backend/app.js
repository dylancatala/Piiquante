const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const helmet = require("helmet");
const app = express();





// CONNEXION MONGODBD
mongoose
  .connect("mongodb://localhost:27017/sauces", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));



//CORS PRIVACY
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
//app.use(helmet());


app.use("/api/auth", userRoutes);


app.use("/api/sauces", sauceRoutes);


app.use("/images", express.static(path.join(__dirname, "images")));




module.exports = app;
