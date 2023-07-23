const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const CategorySchema = require("../validations/categoryValidations")
const JoiMiddleWare = require("../middleware/joiMiddleware");

//To Create Category
router.post("/",
JoiMiddleWare(CategorySchema.createCategorySchema),CategoryController.createCategory);

router.post("/firebase/notification",CategoryController.FCMNotification);

router.post("/create",CategoryController.customerOrder);

router.post("/card-detail",CategoryController.cardDetails);

router.post("/pyament_verify",CategoryController.paymentVerify);

router.get("/getToken",CategoryController.createToken);

router.get("/search",CategoryController.getSongSpotify);

router.get("/shazam_search",CategoryController.shezamSongApi);

//To Get all Category
router.get("/", CategoryController.getAllCategory);

//To Get Category By its id
router.get("/:id", 
JoiMiddleWare(CategorySchema.getCategorySchema, 'params'),CategoryController.getCategoryById);

router.put("/", CategoryController.updateCategory);

/*
    @apiParams = {
        id: number
    }
*/

router.delete("/:id", 
JoiMiddleWare(CategorySchema.deleteCategorySchema, 'params'),
CategoryController.deleteCategory);

module.exports = router;