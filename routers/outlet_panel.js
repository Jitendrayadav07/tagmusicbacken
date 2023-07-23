const express = require("express");
const router = express.Router();
const OutletPanelController = require("../controllers/outletPanelController");
const OutletPanelSchema = require("../validations/outletPanelValidation")
const JoiMiddleWare = require("../middleware/joiMiddleware");

//To create city 
router.post("/",
JoiMiddleWare(OutletPanelSchema.createOutletPanel),OutletPanelController.createOutletPanel);

router.get("/", OutletPanelController.getAllOutletPanel);

/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(OutletPanelSchema.getOutletPanelSchema, 'params'),
OutletPanelController.getOutletPanelById);

router.put("/", OutletPanelController.updateOutletPanel);

/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(OutletPanelSchema.deleteOutletPanel, 'params'),
OutletPanelController.deleteOutletPanel);

module.exports = router;