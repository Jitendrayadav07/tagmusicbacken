const Response = require("../classes/Response");
const db = require("../config/db.conf");

//To create OutletPanel
const createOutletPanel = async (req, res) => {
    try{
        let outlet = await db.outlet_panel.create(req.body);
        res.status(201).send(Response.sendResponse(true,outlet,null,201));
    }catch(err) {
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To Get all  City
const getAllOutletPanel = async (req, res) => {
    try {
        let outlet = await db.outlet_panel.findAll();
        res.status(200).send(Response.sendResponse(true,outlet,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}
// To Get  OutletPanel By its id
const getOutletPanelById = async (req, res) => {
    try {
        let outlet = await db.outlet_panel.findOne({where: {id: req.params.id}});
        res.status(200).send(Response.sendResponse(true,outlet,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To Update  OutletPanel By its id
const updateOutletPanel = async (req, res) => {
    try{
        let outlet = await db.outlet_panel.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,outlet,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

// To delete  OutletPanel By its id
const deleteOutletPanel = async (req, res) => {
    try{
        let outlet = await db.outlet_panel.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,outlet,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}
module.exports = { 
    createOutletPanel,
    getAllOutletPanel,
    getOutletPanelById,
    updateOutletPanel,
    deleteOutletPanel
}


