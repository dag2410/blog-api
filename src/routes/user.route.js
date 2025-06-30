const express = require("express");
const userController = require("../controller/user.controller");
const attachResourceLoader = require("../utils/attachResourceLoader");

const router = express.Router();
attachResourceLoader(router, ["user"]);

router.get("/", userController.getList);
router.get("/:user", userController.getOne);
router.post("/", userController.create);
router.put("/:user", userController.update);
router.patch("/:user", userController.update);
router.delete("/:user", userController.remove);

module.exports = router;
