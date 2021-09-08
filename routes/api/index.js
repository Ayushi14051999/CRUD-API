const express=require('express');
const router=express.Router();

router.get("/", (req, res) => res.send("<h1> Features of this Application:</h1><div><ul><li>Create Products with the Attributes [Required:{Name, Company, Category, Quantity, Price}, Optional:{Description, ContactEmail}]</li><li>Get Information about all the Products on Website</li><li>Delete your Product</li><li>Update your Product</li></ul></div>"));
router.use("/v1", require('./v1'));
module.exports=router;