import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "No token provided");
        }
        const token = authHeader.split(" ")[1];
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
