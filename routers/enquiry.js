var express = require("express");
var router = express.Router();

var enquiryController = require("../controllers/enquiryController");
const JoiMiddleWare = require('../middleware/joiMiddleware');
const enquirySchema = require("../validations/enquiryValidation");

/*
@apiBody { 
    {
        "title": string,
        "description": string,
        "org_id": number
    }
} 
 */

router.post("/", 
JoiMiddleWare(enquirySchema.createEnquiry, 'body'),
enquiryController.createEnquiry);

router.get("/", enquiryController.getEnquiries);

/*
    @apiParams = {
        id: number
    }
*/

router.get("/:id", 
JoiMiddleWare(enquirySchema.getEnquiry, 'params'),
enquiryController.getEnquiry);

router.put("/", 
JoiMiddleWare(enquirySchema.updateEnquiry, 'body'),
enquiryController.updateEnquiry);

/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(enquirySchema.deleteEnquiry, 'params'),
enquiryController.deleteEnquiry);

module.exports = router;