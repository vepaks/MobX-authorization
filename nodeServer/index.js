const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const e = require("express");

const app = express()
const PORT = 5000

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}...`))
  } catch (e) {
      console.log(e)
  }
}

start()