import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET);
            const user = await User.findById(decoded.userid).select("-password");
            if (!user) {
                req.isLoggedIn = false;
                req.userId = null;
            } else {
                req.isLoggedIn = true;
                req.userId = user._id;
                req.user = user;
            }
        } else {
            req.isLoggedIn = false;
            req.userId = null;
        }
        next();
    } catch (error) {
        console.error("Error checking user login status:", error);
        req.isLoggedIn = false;
        req.userId = null;
        next();
    }
});
