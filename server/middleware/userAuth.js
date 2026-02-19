import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const userAuth = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else if (req.cookies && req.cookies.user_token) {
            token = req.cookies.user_token;
        }

        if (!token) {
            throw new ApiError(401, "No token provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user || !user.isActive) {
            throw new ApiError(401, "Not authorized as user");
        }

        // Enforce verification status - logs out user if admin un-verifies them
        if (!user.isVerified) {
            throw new ApiError(401, "Account unverified. Please login again.");
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
