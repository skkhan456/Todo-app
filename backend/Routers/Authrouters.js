const { login,signup } = require("../controllers/Authcontroller");
const { loginValidation,signupValidation } = require("../Middlewares/AuthValidation");
const router = require("express").Router();

router.post("/login",loginValidation, login)
// router.post("/signup", signupValidation, signup);

router.post("/signup", signupValidation,signup)

module.exports = router;
