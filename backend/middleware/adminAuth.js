import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer header

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    // Decode the token using the secret key
    const decoded = jwt.verify(token, 'SrilankanInformationTechnology08');

    // Check if the decoded token is an admin (or compare the decoded token fields)
    if (decoded.email !== 'admin@forever.com' || decoded.password !== 'Shanchika24') {
      return res.status(403).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    // Attach the user information to the request object for use in the next middleware or route handler
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Token is not valid or expired' });
  }
};

export default adminAuth;
