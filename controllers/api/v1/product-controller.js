const ProductModal=require('../../../models/Product');
const mongoose = require('mongoose');
const Modal = mongoose.model("products");
const {validationResult}=require("express-validator");
const md5 = require('md5');

module.exports.createProduct=async(req,res)=>{
    try{
        const errors=validationResult(req);
        if (!errors.isEmpty()){
            res.status(400).json({ errors:errors.array() });
        };
        const data = req.body;

        // delete attributes from request body which are not part of Modal schema to remove error thrown by database due to extra attributes
        for( var key in data){
            const array = ["Name", "Price", "Quantity", "Description", "Company", "Category","ContactEmail"];
            const isExists=array.includes(key);
            if (!isExists) {
                delete data[key];
            }
            
        };

        
        const name=data.Name;
        const company=data.Company;
        const category=data.Category;
        const hashvalue=name+company+category;
        const id = md5(hashvalue);
        data["Hash"]=id;


        // To check if product already exists, adds a product only if its unique
        Modal.find({'Hash' : `${id}`}, async function (err,result)  {
            if(err){
                res.status(500).json({ msg: "Internal Server Error" });
            }else{ 
                if(result.length==0){
                    const productInstance = await ProductModal.create(data);
                    res.status(200).json({msg:"Product Created", data: productInstance});
                }else{
                    res.status(400).json({ msg: "Product already exists" });
                }

            }
            
        });
           

    }catch(error){
        console.log("Error in creating product, error");
        res.status(500).json({msg:"Internal Server Error"});
    }
};
module.exports.getalltheProducts = async (req, res) => {
    try {
        const allproductInstances = await ProductModal.find();
        res.status(200).json({ msg: "Products accessed", data: allproductInstances });

    } catch (error) {
        console.log("Error in getting the products", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports.deleteProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        };
        const data = req.body;
        // delete attributes from request body other than schema attributes, not very useful here just for cleaning the request body
        for (var key in data) {
            const array = ["Name", "Price", "Quantity", "Description", "Company", "Category", "ContactEmail"];
            const isExists = array.includes(key);
            if (!isExists) {
                delete data[key];
            }
        };

        const name = data.Name;
        const company = data.Company;
        const category = data.Category;
        const hashvalue = name + company + category;
        const id = md5(hashvalue);

        // To find the product that needs to be deleted 
        const deletedInstance= await Modal.findOneAndDelete({ 'Hash': `${id}` });
        res.status(200).json({ msg: "Product deleted", data: deletedInstance });


    } catch (error) {
        console.log("Error in deleting the product", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
module.exports.updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        };
        const data = req.query;
        conditions=JSON.parse(data.conditions);
        updateparam=JSON.parse(data.update);

        // delete attributes from request query other than schema attributes
        for (var key in conditions) {
            const array = ["Name", "Company", "Category"];
            const isExists = array.includes(key);
            if (!isExists) {
                delete conditions[key];
            }

        };
        
        // delete attributes from request query other than schema attributes
        for (var key in updateparam) {
            const array = ["Name", "Price", "Quantity", "Description", "Company", "Category", "ContactEmail"];
            const isExists = array.includes(key);
            if (!isExists) {
                delete updateparam[key];
            }

        };
        
        const updateparamArray = [];
        for (var key in updateparam) {
            updateparamArray.push(key);
        };

        if (updateparamArray.length===0){
            res.status(400).json({ msg: "Attributes provided by you can't be updated because parameters out of the fields:{Name, Company, Category, Price, Quantity, Description, ContactEmail} aren't part of Product Modal"});
        };

        const conditionsArray=[];
        for (var key in conditions) {
            conditionsArray.push(key);
        };
        const arrayAtrributes = ["Name", "Company", "Category"];

        if(conditionsArray.length==arrayAtrributes.length){
            //Move ahead
        }else{
            res.status(400).json({ msg: "Fields: Name, Company, Category, all three are required so that changes are applied only to your product" });
        }
        
        const updateproductInstance = await ProductModal.updateOne(conditions,updateparam);
        console.log(conditions,updateparam);
        res.status(200).json({ msg: "Product updated", data: updateproductInstance });

    } catch (error) {
        console.log("Error in updating the product", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};