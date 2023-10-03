const Router = require("express").Router;
const UserControllers = require("../controllers/user-controller");
const router = new Router();
const {body} = require('express-validator')
// /api/
router.post("/registration",
    // валидации при регистрация
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 20}),
    UserControllers.registration);
router.post("/login", UserControllers.login);
router.post("/logout", UserControllers.logout);
router.get("/activate/:link", UserControllers.activate);
router.get("/refresh", UserControllers.refresh);
//test endpoint
router.get("/users", UserControllers.getUsers);

module.exports = router;
