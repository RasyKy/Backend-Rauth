const { auth, db } = require('../config/firebase');

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    req.token = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};

const checkAdmin = (req, res, next) => {
  const userRole = req.token.role;

  if (userRole === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden. Admin access required.' });
  }
};

module.exports = { checkAuth, checkAdmin };
