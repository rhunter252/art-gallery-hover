const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

const app = express();

app.use("/openai", require("./routes/openaiRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
