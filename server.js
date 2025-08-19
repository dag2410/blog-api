require("dotenv").config();
require("module-alias/register");
const express = require("express");
const cors = require("cors");
const router = require("@/routes");
const cookieParser = require("cookie-parser");
const handleErrors = require("@/middleware/handleError");
const notFoundHandler = require("@/middleware/notFoundHandler");
const uploadRoutes = require("@/routes/upload.route");

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use("/api/v1", uploadRoutes);
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(handleErrors);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
