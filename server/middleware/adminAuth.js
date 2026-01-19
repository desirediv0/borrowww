import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "No token provided");
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });
        if (!admin || !admin.isActive) {
            throw new ApiError(401, "Not authorized as admin");
        }
        req.admin = admin;
        next();
    } catch (err) {
        next(err);
    }
};
