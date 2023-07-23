module.exports =(sequelize,Sequelize) => {
    const OrganizationPancardDetails = sequelize.define('organization_pancard_details',{
        full_name: {
            type: Sequelize.STRING
        },
        father_name:{
            type: Sequelize.STRING
        },
        org_id:{
            type: Sequelize.INTEGER
        },
        pancard_number: {
            type: Sequelize.STRING
        },
        pancard_image: {
            type: Sequelize.TEXT
        },
        date_of_birth: {
            type: Sequelize.DATEONLY,
            field: 'date_of_birth'
        },
        is_pancard_verified:{
            type: Sequelize.BOOLEAN,   
            defaultValue: 0
        }
        }, {
            timestamps: true,
            underscored: true
        });
        
        return OrganizationPancardDetails;
};