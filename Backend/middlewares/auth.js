import Admin from "../models/Admin.js";

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    const decoded = Admin.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin; // Attach Admin object to request
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
