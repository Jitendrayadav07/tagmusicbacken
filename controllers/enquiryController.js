const Response = require("../classes/Response");
const db = require("../config/db.conf");

const createEnquiry = async (req, res) => {
    try{
        let enq = await db.enquiry.create(req.body);
        res.status(201).send(Response.sendResponse(true,enq,null,201));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getEnquiries = async (req,res) => {
    try {
        let enq = await db.enquiry.findAll({});
        res.status(200).send(Response.sendResponse(true,enq,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getEnquiry = async (req,res) => {
    try {
        let enq = await db.enquiry.findOne({where: {id: req.params.id}});
        res.status(200).send(Response.sendResponse(true,enq,null,200))
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const updateEnquiry = async (req, res) => {
    try {
        let response = await db.enquiry.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    } catch (err) {
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
};

const deleteEnquiry = async (req, res) => {
    try{
        let enq = await db.enquiry.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,enq,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}
module.exports = { 
    createEnquiry, 
    getEnquiry, 
    getEnquiries, 
    deleteEnquiry, 
    updateEnquiry 
}