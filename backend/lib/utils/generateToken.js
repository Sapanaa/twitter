import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userid, res) => {
    const token = jwt.sign({userid}, process.env.JWT_SECRET, {
        expiresIn: "30d"
        })


    res.cookie("jwt", token, {
        httpOnly: true, //prevent xss attacks 
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict", //prevent csrf attacks 
        maxAge: 30 * 24 * 60 * 60 * 1000 //ms
    })
}