const admin = require("../firebase/firebase.config");

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).send({ error: true, message: "Unauthorized access" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send({ error: true, message: "Forbidden access" });
  }
};

module.exports = verifyToken;