const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const Joi = require("joi")
const validator = require("express-joi-validation").createValidator()
const tokenAuth = require("../middleware/tokenAuth")


const registration = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
})
const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
})


router.post("/registration", validator.body(registration), authController.controller.registration)

router.post("/login", validator.body(login), authController.controller.login)

// test Route for testing Middleware

router.get("/test", tokenAuth,(req,res)=>{
res.send("tess Pass  ")
})


module.exports = router