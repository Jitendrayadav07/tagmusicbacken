const express = require("express");
const router = express.Router();
const CityController = require("../controllers/cityController");
const CitySchema = require("../validations/cityValidation")
const JoiMiddleWare = require("../middleware/joiMiddleware");

//To create city 
router.post("/",
JoiMiddleWare(CitySchema.createCity),CityController.createCity);

router.get("/", CityController.getAllCity);

/*
    @apiParams = {
        id: number
    }
*/
router.get("/:id", 
JoiMiddleWare(CitySchema.getCitySchema, 'params'),
CityController.getCityById);

router.put("/", CityController.updateCity);

/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(CitySchema.deleteCity, 'params'),
CityController.deleteCity);

module.exports = router;