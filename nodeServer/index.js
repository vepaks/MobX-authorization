require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
const PORT =  process.env.PORT || 3000

const start = async () => {
  try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true

      }).then(() => console.log("Connected to database"))
          .catch((err) => console.log("DB Error", err));

    app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}...`))
  } catch (e) {
      console.log(e)
  }
}

start()


