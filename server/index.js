require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        // линк за front end
        origin: process.env.CLIENT_URL
    }
));
app.use("/api", router);
app.use(errorMiddleware)
//  функция за стартиране на сървъра и свързване към БД
const start = async () => {
  try{
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to database"))
      .catch((err) => console.log("DB Error", err));

    app.listen(PORT, () =>
      console.log(`Server running http://localhost:${PORT}...`),
    );
  } catch (e) {
    console.log(e);
  }
};

start();
