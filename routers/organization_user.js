var express = require("express");
var router = express.Router();

var userController = require("../controllers/organizationUserController");
const userAuth = require("../middleware/jwtAuthMiddleware");
const JoiMiddleWare = require("../middleware/joiMiddleware");
const userSchema = require("../validations/userValidation");

/*
@apiBody { 
    {
        "full_name": string,
        "email": string,
        "phone": number,
        "password": string,
        "is_email_verified": number,

    }
} 
 */

router.post("/organization/user", userController.registerOrganizationUser);


module.exports = router;
