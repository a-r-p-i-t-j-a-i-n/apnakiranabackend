const jwt=require('jsonwebtoken')
const jwtsecret="arpit@123"

const authenticateToken = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, jwtsecret);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }

}

  module.exports=authenticateToken;