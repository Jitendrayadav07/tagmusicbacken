const Response = require("../classes/Response");
const db = require("../config/db.conf")


const createRole = async (req, res) => {
    try{
        let response = await db.roles.create(req.body);
        res.status(201).send(Response.sendResponse(true,response,null,201));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getRoles = async (req, res) => {
    try {
        let response = await db.roles.findAll();
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getRole = async (req, res) => {
    try {
        let response = await db.roles.findOne({where: {id: req.params.id}});
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const updateRole = async (req, res) => {
    try{
        let response = await db.roles.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const deleteRole = async (req, res) => {
    try{
        let role = await db.roles.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,role,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}


module.exports = { 
    createRole, 
    getRoles, 
    getRole, 
    updateRole, 
    deleteRole
}