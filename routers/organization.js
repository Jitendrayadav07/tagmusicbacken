const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/jwtAuthOrgMiddleware");

const OrganizationController = require("../controllers/organization");
const JoiMiddleWare = require('../middleware/joiMiddleware'); 
const OrganizationSchema = require('../validations/organizationValidation');

/* Validator middle ware for Joi Passes the error ahead */
/* If Middleware succeeds it will go to the controller. */

/*
@apiBody { 
    {
        "name": string
    }
} 
 */

router.post("/create", 
JoiMiddleWare(OrganizationSchema.createOrganizationSchema, 'body'),
OrganizationController.createOrganization);

router.post("/set_password", 
OrganizationController.setOrganizationUserPassword);
// JoiMiddleWare(OrganizationSchema.createOrganizationSchema, 'body'),


router.post("/sign-in",
JoiMiddleWare(OrganizationSchema.login, 'body'),
OrganizationController.organizationSignIn);

router.get("/location-name",
  JoiMiddleWare(OrganizationSchema.getOrganizationBySearchSchema, "query"),OrganizationController.getOrganizationBySearch
);

router.get("/all", OrganizationController.getAllOrganization);

router.get("/pagination", OrganizationController.getAllOrganizationPagination);





/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(OrganizationSchema.getOrganizationSchema, 'params'),
OrganizationController.getOrganization);

router.put("/", OrganizationController.updateOrganization);


/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(OrganizationSchema.deleteOrganizationSchema, 'params'),
OrganizationController.deleteOrganization);


module.exports = router;