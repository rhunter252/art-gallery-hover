const path = require("path");
const express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 5000;

const app = express();

// Enable body parser
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/openai", require("./routes/openaiRoutes"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
