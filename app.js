const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Enable body parser
app.use(express.urlencoded({ extended: false }));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});