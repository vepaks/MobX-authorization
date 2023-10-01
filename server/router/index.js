const Router = require("express").Router;
const UserControllers = require("../controllers/user-controller");
const router = new Router();

// /api/
router.post("/registration", UserControllers.registration);
router.post("/login", UserControllers.login);
router.post("/logout", UserControllers.logout);
router.get("/activate/:link", UserControllers.activate);
router.get("/refresh", UserControllers.refresh);
//test endpoint
router.get("/users", UserControllers.getUsers);

module.exports = router;
