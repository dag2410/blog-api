const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

router.get("/", userController.getList);
router.get("/:id", userController.getOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.patch("/:id", userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
