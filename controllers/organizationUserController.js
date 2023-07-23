const Response = require("../classes/Response");
const db = require("../config/db.conf");
const bcrypt = require("bcrypt");
const sendEmail = require("../config/sendEmail");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_SECRET_ORG_USER } = require("../config/jwtTokenKey");
const { Op } = require("sequelize");
// const userAuth = require("../middleware/tokenMiddleware");
const { users } = require("../config/db.conf");
const S3Upload = require("../classes/S3Upload");

const registerUser = async (req, res) => {
    try {
      let user_data = await db.users.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { phone: req.body.phone }],
        },
      });
  
      if (user_data) {
        if (user_data.email == req.body.email)
          return res
            .status(400)
            .send(Response.sendResponse(false, null, "Email Already Exist", 400));
        else if (user_data.phone == req.body.phone) {
          return res
            .status(400)
            .send(Response.sendResponse(false, null, "Phone Already Exist", 400));
        }
      }
  
    //   req.body.password = await bcrypt.hash(req.body.password, 10);
      let user = await db.users.create(req.body);
      let emailData = {
        token: "mypersonaltoken",
        filePath: "../config/template.html",
      };
      await sendEmail(req.body.email, "Verify Email", emailData);
      res.status(201).send(Response.sendResponse(true, user, null, 201));
    } catch (err) {
      console.log("errr",err)
      return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
  };
 
  const registerOrganizationUser = async (req, res) => {
    let user_data = await db.users.findOne({
      where: [{ email: req.body.email }],
    });
    if (user_data)
      return res
        .status(400)
        .send(Response.sendResponse(false, null, "Email Already Exist", 400));
   
    let user = await db.users.create(req.body);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        organization_id: user.org_id,
      },
      JWT_SECRET_ORG_USER,
      { expiresIn: "30m" }
    );
  
    let emailData = {
      token: token,
      filePath: "/template.html",
    };
    await sendEmail(req.body.email, "Set Password Email", emailData);
    res
      .status(201)
      .send(Response.sendResponse(true, user, "User created successfully", 201));
  };


module.exports = {
  registerOrganizationUser,
};
