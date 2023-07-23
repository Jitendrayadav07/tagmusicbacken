module.exports =(sequelize,Sequelize) => {
    const OrganizationBankDetails = sequelize.define('organization_bank_details',{
        org_id: {
            type: Sequelize.INTEGER
        },
        address:{
            type: Sequelize.TEXT
        },
        GSTN:{
            type: Sequelize.STRING,
            field: 'GSTN'
        },
        account_number: {
            type: Sequelize.STRING
        },
        bank_name: {
            type: Sequelize.STRING
        },
        bank_branch_name: {
            type: Sequelize.STRING
        },
        ifsc_code: {
            type: Sequelize.STRING
        },
        front_image:{
            type: Sequelize.TEXT
        },
        }, {
            timestamps: true,
            underscored: true
        });
        
        return OrganizationBankDetails;
};