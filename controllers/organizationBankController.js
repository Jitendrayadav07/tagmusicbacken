const Response = require("../classes/Response");
const db = require("../config/db.conf")
const S3Upload = require('../classes/S3Upload');
const CompressFile = require('../classes/CompressFile');
const { Op } = require("sequelize");
const userAuth = require("../middleware/jwtAuthOrgMiddleware");

const createOrganizationBankDetails = async (req, res) => {
    try{
        let frontImage = req.files.front_image;
  
        let file = new CompressFile(frontImage);

        let compressImage = await file.image(); 

        let s3 = new S3Upload('tagtalk-website');
        let uploadedImage = await s3.uploadImage(compressImage.blob,compressImage.ref);

        let Banklogo = uploadedImage.Location;
        req.body.front_image = Banklogo

        let org_data = await db.organization_bank.findOne({
            where :{
                [Op.or] :[{org_id :req.body.org_id} ,{account_number:req.body.account_number}],
            },
        });

        if(org_data){
            if(org_data.org_id == req.body.org_id)
            return res.status(400).send(Response.sendResponse(false, null, "Org-ID Already Exist", 400));
            else if(org_data.account_number == req.body.account_number){
            return res.status(400).send(Response.sendResponse(false, null, "Account Number Already Exist", 400));
           }
        }
        let org_id = req.user.id;
        req.body["org_id"] = org_id
        let response = await db.organization_bank.create(req.body);
        
        res.status(201).send(Response.sendResponse(true,response,null,201));
    }catch(err) {
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getAllOrganizationBankDeatils = async (req, res) => {
    try {
        let response = await db.organization_bank.findAll();
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getOrganizationBankDeatils = async (req, res) => {
    try {
        let response = await db.organization_bank.findOne({where: {id: req.params.id},
            include:[{model:db.organization ,attributes:['id','name']}]
        });
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const updateOrganizationBankDeatils = async (req, res) => {
    try{
        let response = await db.organization_bank.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const deleteOrganizationBankDeatils = async (req, res) => {
    try{
        let response = await db.organization_bank.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}


module.exports = { 
    createOrganizationBankDetails, 
    getAllOrganizationBankDeatils, 
    getOrganizationBankDeatils, 
    updateOrganizationBankDeatils, 
    deleteOrganizationBankDeatils
}