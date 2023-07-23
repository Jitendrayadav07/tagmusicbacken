const jwt = require("jsonwebtoken");
const Response = require("../classes/Response");
const db = require("../config/db.conf");
const { Op, QueryTypes ,sequelize} = require("sequelize");
const { JWT_SECRET } = require("../config/jwtTokenKey");

const verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) 
      return res.status(403).send(Response.sendResponse(false, null, 'A token is required for authentication',403));
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const org_data = await db.sequelize.query(`SELECT id,email,phone_number FROM organizations where email = '${decoded.email}'`,{ type: QueryTypes.SELECT });
      req.user = org_data[0];
    } catch (err) {
      return res.status(401).send(Response.sendResponse(false, null, 'Invalid Token',401));
    }

    return next();
};

module.exports = verifyToken;