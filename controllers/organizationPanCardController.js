const Response = require("../classes/Response");
const db = require("../config/db.conf")
const S3Upload = require('../classes/S3Upload');
const CompressFile = require('../classes/CompressFile');
const { Op } = require("sequelize");
const userAuth = require("../middleware/jwtAuthOrgMiddleware");

const createOrganizationPanCard = async (req, res) => {
    try{
        let pancardImage = req.files.pancard_image;

        let file = new CompressFile(pancardImage);
        let compressImage = await file.image(); 

        let s3 = new S3Upload('tagtalk-website');
        let uploadedImage = await s3.uploadImage(compressImage.blob,compressImage.ref);

        let PanCardlogo = uploadedImage.Location;

        req.body.pancard_image= PanCardlogo;
        
        let org_data = await db.organization_pancard.findOne({
            where :{
                [Op.or] :[{full_name :req.body.full_name} ,{pancard_number:req.body.pancard_number}],
            },
        });

        if(org_data){
            if(org_data.full_name == req.body.full_name)
            return res.status(400).send(Response.sendResponse(false, null, "FullName Already Exist", 400));
            else if(org_data.pancard_number == req.body.pancard_number){
            return res.status(400).send(Response.sendResponse(false, null, "PanCard Number Already Exist", 400));
           }
        }
        let org_id = req.user.id;
        req.body["org_id"] = org_id
        let response = await db.organization_pancard.create(req.body);
        
        res.status(201).send(Response.sendResponse(true,response,null,201));
    }catch(err) {
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getAllOrganizationPanCard = async (req, res) => {
    try {
        let response = await db.organization_pancard.findAll();
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getOrganizationPanCard = async (req, res) => {
    try {
        let response = await db.organization_pancard.findOne({where: {id: req.params.id},
        include:[{model:db.organization ,attributes:['id','name']}]});
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const updateOrganizationPanCard = async (req, res) => {
    try{
        let response = await db.organization_pancard.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const deleteOrganizationPanCard = async (req, res) => {
    try{
        let response = await db.organization_pancard.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}


module.exports = { 
    createOrganizationPanCard, 
    getAllOrganizationPanCard, 
    getOrganizationPanCard, 
    updateOrganizationPanCard, 
    deleteOrganizationPanCard
}