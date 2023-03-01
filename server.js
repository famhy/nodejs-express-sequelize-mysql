const express = require("express")
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./app/models");


var corsOptions = {
    origin: "http://localhost:8081"
  };
  app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
console.log(process.env.DB_HOST)
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
  });

  require("./app/routes/tutorial.routes")(app);

  
  // set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(process.env.DB_HOST)
  console.log(`Server is running on port ${PORT}.`);
});