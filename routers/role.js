const express = require("express");
const router = express.Router();


const roleController = require("../controllers/roleController");
const JoiMiddleWare = require('../middleware/joiMiddleware'); 
const roleSchema = require("../validations/roleValidation");

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
JoiMiddleWare(roleSchema.createRole, 'body'),
roleController.createRole);

router.get("/", roleController. getRoles);



/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(roleSchema.getRole, 'params'),
roleController. getRole);

router.put("/", roleController. updateRole);


/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(roleSchema.deleteRole, 'params'),
roleController.deleteRole);


module.exports = router;