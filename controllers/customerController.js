const Response = require("../classes/Response");
const db = require("../config/db.conf")


const createCustomerDetails = async (req, res) => {
    try{
        let response = await db.roles.create(req.body);
        res.status(201).send(Response.sendResponse(true,response,null,201));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getAllCustomerDetails = async (req, res) => {
    try {
        let response = await db.roles.findAll();
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getCustomerDetails = async (req, res) => {
    try {
        let response = await db.roles.findOne({where: {id: req.params.id}});
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const updateCustomerDetails = async (req, res) => {
    try{
        let response = await db.roles.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const deleteCustomerDetails = async (req, res) => {
    try{
        let response = await db.roles.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}


module.exports = { 
    createCustomerDetails, 
    getAllCustomerDetails, 
    getCustomerDetails, 
    updateCustomerDetails, 
    deleteCustomerDetails
}