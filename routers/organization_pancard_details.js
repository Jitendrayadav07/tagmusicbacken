const express = require("express");
const router = express.Router();

const OrganizationPanCardController = require("../controllers/organizationPanCardController");
const JoiMiddleWare = require('../middleware/joiMiddleware'); 
const organizationPanCardSchema = require('../validations/organizationPancardValidation');
const userAuth = require("../middleware/jwtAuthOrgMiddleware");

/* Validator middle ware for Joi Passes the error ahead */
/* If Middleware succeeds it will go to the controller. */

/*
@apiBody { 
    {
        "name": string
    }
} 
 */

router.post("/", 
JoiMiddleWare(organizationPanCardSchema.createorganizationPanCardSchema, 'body'),userAuth,
OrganizationPanCardController.createOrganizationPanCard);

// router.post("/sign-in",
// JoiMiddleWare(organizationPanCardSchema.login, 'body'),
// OrganizationPanCardController.organizationSignIn);

router.get("/", OrganizationPanCardController.getAllOrganizationPanCard);



/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(organizationPanCardSchema.getOrganizationPanCardSchema, 'params'),
OrganizationPanCardController.getOrganizationPanCard);

router.put("/", OrganizationPanCardController.updateOrganizationPanCard);


/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(organizationPanCardSchema.deleteOrganizationPanCardSchema, 'params'),
OrganizationPanCardController.deleteOrganizationPanCard);


module.exports = router;