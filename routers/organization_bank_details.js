const express = require("express");
const router = express.Router();


const OrganizationBankDetailsController = require("../controllers/organizationBankController");
const JoiMiddleWare = require('../middleware/joiMiddleware'); 
const OrganizationBankDetailsSchema = require('../validations/organizationBankValidation');
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
JoiMiddleWare(OrganizationBankDetailsSchema.createorganizationBankDetailsSchema, 'body'),userAuth,
OrganizationBankDetailsController.createOrganizationBankDetails);


router.get("/", OrganizationBankDetailsController.getAllOrganizationBankDeatils);



/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(OrganizationBankDetailsSchema.getOrganizationBankDetailsSchema, 'params'),
OrganizationBankDetailsController.getOrganizationBankDeatils);

router.put("/", OrganizationBankDetailsController.updateOrganizationBankDeatils);


/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(OrganizationBankDetailsSchema.deleteOrganizationBankDetailsSchema, 'params'),
OrganizationBankDetailsController.deleteOrganizationBankDeatils);


module.exports = router;