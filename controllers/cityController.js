const Response = require("../classes/Response");
const db = require("../config/db.conf");

//To create City
const createCity = async (req, res) => {
    try{
        let city = await db.cities.create(req.body);
        res.status(201).send(Response.sendResponse(true,city,null,201));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To Get all  City
const getAllCity = async (req, res) => {
    try {
        let city = await db.cities.findAll();
        res.status(200).send(Response.sendResponse(true,city,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}
// To Get  City By its id
const getCityById = async (req, res) => {
    try {
        let city = await db.cities.findOne({where: {id: req.params.id}});
        res.status(200).send(Response.sendResponse(true,city,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To Update  City By its id
const updateCity = async (req, res) => {
    try{
        let city = await db.cities.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,city,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To delete  City By its id
const deleteCity = async (req, res) => {
    try{
        let city = await db.cities.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,city,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}
module.exports = { 
    createCity,
    getAllCity,
    getCityById,
    updateCity,
    deleteCity
}


