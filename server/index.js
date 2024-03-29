const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

// init routes
app.use("/", require("./routes/route"));

app.listen(port, () => {
  console.log(`Server is listen on localhost:${port}`);
});
