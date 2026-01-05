import jwt from "jsonwebtoken"
export const isLoggedIn = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "failed",
                message: "Please sign in first"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // { id: ... }
        next();
    } catch (err) {
        res.status(401).json({
            status: "failed",
            message: "Invalid or expired token"
        });
    }
};
