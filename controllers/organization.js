const Response = require("../classes/Response");
const db = require("../config/db.conf");
const bcrypt = require("bcrypt");
const sendOrgEmail = require("../config/sendOrgEmail");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/jwtTokenKey");
const { Op ,QueryTypes } = require("sequelize");
const S3Upload = require('../classes/S3Upload');
const CompressFile = require('../classes/CompressFile');

const createOrganization = async (req, res) => {
    try {
        let org_data = await db.organization.findOne({
            where: {
                [Op.or]:[{email:req.body.email},{phone_number: req.body.phone_number}],
            },
        });

        if(org_data){
            if(org_data.email == req.body.email)
            return res.status(400).send(Response.sendResponse(false, null, "Email Already Exist", 400));
            else if(org_data.phone_number == req.body.phone_number){
            return res.status(400).send(Response.sendResponse(false, null, "Phone Already Exist", 400));
         }
        }

        let display_logo = req.files.display_logo;

        let file = new CompressFile(display_logo);
        let compressImage = await file.image();

        let s3 = new S3Upload('tagtalk-website');
        let uploadedImage = await s3.uploadImage(compressImage.blob,compressImage.ref);

        let logo = uploadedImage.Location;

        req.body.display_logo = logo;

        let response = await db.organization.create(req.body);

        const assignOrganizationData = {
            id : response.dataValues.id,
            email : response.dataValues.email,
            phone_number : response.dataValues.phone_number,
            name : response.dataValues.name,
        }

        const token = jwt.sign({
            email: assignOrganizationData.email,
            phone_number: assignOrganizationData.phone_number,
            name: assignOrganizationData.name
          }, JWT_SECRET, {
            expiresIn: "30m"
          });

        console.log("token",token)
        const emailData = {token: token,filePath: "../email_templates/templateSetPassword.html"};

        await sendOrgEmail(assignOrganizationData.email, "Set Password",emailData);

        res.status(201).send(Response.sendResponse(true, response, "Organization Created Successfully", 201));
    } catch (error) {
        console.log(error)
        return res.status(500).send(Response.sendResponse(false, null, error, 500));
    }
}

const setOrganizationUserPassword = async (req, res) => {
    try {
      const user = {
        token: req.body.token,
        password: await bcrypt.hash(req.body.password, 10)
      };
      
      const decoded = jwt.verify(user.token, JWT_SECRET);
      console.log("decoded", decoded);
  
      const tokendata = {
        is_email_verified: 1,
        password: await bcrypt.hash(req.body.password, 10)
      };
      console.log("tokendata", tokendata);
  
      await db.organization.update(tokendata, { where: { email: decoded.email } });
  
      res.status(200).send(Response.sendResponse(true, null, "Password set successfully", 200));
    } catch (err) {
      console.log(error);
      return res.status(500).send(Response.sendResponse(false, null, error, 500));
    }
  };

const organizationSignIn = async (req,res) =>{
    try{
       let user_data =  await db.organization.findOne({where: { email: req.body.email }});
      if(!user_data){
        return res.status(404).send(Response.sendResponse(false, null, "Email or Password Invalid", 404));
      }

      let passwordMatch = await bcrypt.compare(req.body.password,user_data.password)

      if (!passwordMatch)
      return res.status(404).send(Response.sendResponse(false, null, "Email or Password Invalid", 404));

      delete user_data.dataValues.password;

      const token = jwt.sign(
        { email: user_data.email, phone_number: user_data.phone_number, org_id :user_data.id},
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      console.log("token",token)
      user_data.dataValues["token"] = token;
      res.status(200).send(Response.sendResponse(true, user_data, null, 200));
    }catch(err){
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getAllOrganization = async (req,res) => {
    try {
        let response = await db.organization.findAll({});
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getAllOrganizationPagination = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit;

        let response = await db.sequelize.query(
            `SELECT og.id ,name,city,display_name,display_logo,phone_number,address,area,state,pin_code,latitude,longitude,country,email,is_email_verified,created_at
            FROM organizations AS og
            ORDER BY created_at DESC
            LIMIT ${limit} OFFSET ${skip}`,
            { type: QueryTypes.SELECT }
        );
        // let response = await db.organization.findAll();
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        console.log("err",err)
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const getOrganizationBySearch = async (req, res) => {
    try {
      let name = req.query.name;
      let response = await db.organization.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });
      res.status(200).send(Response.sendResponse(true, response, null, 200));
    } catch (err) {
      return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
};

const getOrganization  = async (req, res) => {
    try {
        let response = await db.organization.findOne({where: {id: req.params.id},
        include:[
            {
                model: db.categories,
            attributes:['id','name'],
            },
        ]});
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}


const updateOrganization  = async (req, res) => {
    try{
        let response = await db.organization.update(req.body, {where: {id : req.body.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}

const deleteOrganization  = async (req, res) => {
    try{
        let response = await db.organization.destroy({where: {id : req.params.id}})
        res.status(200).send(Response.sendResponse(true,response,null,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,err,500));
    }
}


module.exports = { 
    createOrganization, 
    setOrganizationUserPassword,
    organizationSignIn,
    getAllOrganization,
    getAllOrganizationPagination, 
    getOrganization, 
    getOrganizationBySearch,
    updateOrganization, 
    deleteOrganization 
}