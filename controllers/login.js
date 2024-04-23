const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find emailtabase
        const user = await User.findOne({ email: email })

        if (user && (await bcrypt.compare(password, user.password))) {
          
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

        }

        return res.status(401).send("Invalid Credential. Please try again")


    } catch (error) {
        return res.status(500).send("Error Occured. Please try again")
    }
}



module.exports = login