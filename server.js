require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const router = require("@/routes");
const cookieParser = require("cookie-parser");
const handleErrors = require("@/middleware/handleError");
const notFoundHandler = require("@/middleware/notFoundHandler");
const app = express();
const port = 3001;

app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(handleErrors);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
