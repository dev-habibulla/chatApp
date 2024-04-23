const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const registration = async (req, res) => {

    try {

        const { username, email, password } = req.body

        const userExists = await User.exists({ email })
        if (userExists) {
            return res.status(409).send("Email already exists. Please try new email or login this email")
        }

        // encrypt passsword

        const encryptPassword = await bcrypt.hash(password, 10)

        // create user document   And Also save this document in Database 

        const user = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: encryptPassword
        })

       // Create JWT token
       const token = jwt.sign(
        {
            userID: user._id,
            email: user.email
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "24h"
        }
    )

        return res.status(201).json({
            userDetails: {
                token: token,
                username: user.username,
                email: user.email

            }
        })


    } catch (error) {
        return res.status(500).send("Error Occured. Please try again")
    }
}

module.exports = registration
