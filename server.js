require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const router = require("@/routes");
const handleErrors = require("@/middleware/handleError");
const notFoundHandler = require("@/middleware/notFoundHandler");
const app = express();
const port = 3001;

app.use(cors()); //
app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(handleErrors);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
