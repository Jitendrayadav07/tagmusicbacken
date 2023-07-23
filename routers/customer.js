const express = require("express");
const router = express.Router();


const customerController = require("../controllers/customerController");
const JoiMiddleWare = require('../middleware/joiMiddleware'); 
const customerSchema = require("../validations/customerValidation");

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
JoiMiddleWare(customerSchema.createCustomer, 'body'),
customerController.createCustomerDetails);

router.get("/", customerController.getAllCustomerDetails);



/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(customerSchema.getCustomer, 'params'),
customerController.getCustomerDetails);

router.put("/", customerController.updateCustomerDetails);


/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(customerSchema.deleteCustomer, 'params'),
customerController.deleteCustomerDetails);


module.exports = router;