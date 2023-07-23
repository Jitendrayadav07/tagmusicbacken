const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('tag_music', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port:3306
   });


sequelize.authenticate().then(result => {
    console.log("mysql connected successful")
}).catch(err => {console.log("err",err)});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//

db.roles = require("../models/role")(sequelize,Sequelize);
db.organization = require("../models/organization")(sequelize,Sequelize);
db.customer = require("../models/customer")(sequelize,Sequelize);
db.categories = require("../models/category")(sequelize,Sequelize);
db.organization_pancard = require("../models/organization_pancard_details")(sequelize,Sequelize);
db.organization_bank = require("../models/organization_bank_details")(sequelize,Sequelize);
db.cities= require("../models/city")(sequelize,Sequelize);
db.users = require("../models/organization_user")(sequelize,Sequelize);
db.enquiry = require("../models/enquiry")(sequelize,Sequelize);
db.outlet_panel = require("../models/outlet_panel")(sequelize,Sequelize);

//JOIN Table

db.organization.belongsTo(db.roles, { foreignkey : 'role_id'});
db.roles.hasOne(db.organization , {foreignkey : 'role_id'});

db.organization.belongsTo(db.categories, { foreignkey : 'category_id'});
db.categories.hasOne(db.organization , {foreignkey : 'category_id'});

//One to one Pancard and org association
db.organization_pancard.belongsTo(db.organization, { foreignKey: 'org_id'})
db.organization.hasOne(db.organization_pancard, { foreignKey: 'org_id'});

//One to one Bank and org association
db.organization_bank.belongsTo(db.organization, { foreignKey: 'org_id'})
db.organization.hasOne(db.organization_bank, { foreignKey: 'org_id'});



module.exports = db;