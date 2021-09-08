const express = require('express');
const router = express.Router();
const productController=require("../../../controllers/api/v1/product-controller");
const { body, query}=require("express-validator");
router.get("/", (req, res) => res.send("<h1>Following are the ways using which you can perform your Product related Operations on this Website:</h1> <div><ul><li>Create Products by sending POST request having JSON body using the Attributes mentioned previously on path '/create' relative to the path you are at present</li><li>Get Information about all the Products on Website by sending GET Request on path '/getProducts' relative to the path you are at present </li><li>Delete your Product by sending DELETE request having JSON body on path '/delete' relative to the path you are at present</li><li>Update your Product by sending PUT request with query having parameters [conditions, update] on path '/update' relative to the path you are at present</li></ul></div>"));

router.post("/create", [
    body("Name").not().isEmpty().withMessage("Name is Empty, its a necessary Field"), body("Quantity").isFloat({ gt: 0 }).withMessage("Quantity is less than zero"), body("Company").not().isEmpty().withMessage("Company name is not provided, its a necessary Field"), body("Category").not().isEmpty().withMessage("Category is not mentioned, its a necessary Field"), body("Price").isFloat({ gt: 0 }).withMessage("Price of the product is less than zero"), body("ContactEmail").if(body("ContactEmail").exists()).isEmail().withMessage("The email address provided is not valid")
], productController.createProduct);


router.get("/getProducts", productController.getalltheProducts);

router.delete("/delete", [
    body("Name").not().isEmpty().withMessage("Name is Empty in the request body, it is necessary to delete the product you wish to, so that multiple products with same Company Name and Category but different names are not deleted"), body("Company").not().isEmpty().withMessage("Company name is not provided in the request body, it is necessary to delete the product you wish to, so that multiple products with same Name and Category but different Company names are not deleted"), body("Category").not().isEmpty().withMessage("Category is not mentioned in the request body, it is necessary to delete the product you wish to, so that multiple products with same Name and Company name having different categories are not deleted"), body("ContactEmail").if(body("ContactEmail").exists()).isEmail().withMessage("The email address provided is not valid"), body("Quantity").if(body("Quantity").exists()).isFloat({ gt: 0 }).withMessage("Quantity is less than zero"), body("Price").if(body("Price").exists()).isFloat({ gt: 0 }).withMessage("Price is less than zero")
], productController.deleteProduct);

router.put("/update", [query("conditions").not().isEmpty().withMessage("The parameter named conditions passed in put request is empty"), query("update").not().isEmpty().withMessage("The parameter named update passed in put request is empty")
], productController.updateProduct);

module.exports = router;