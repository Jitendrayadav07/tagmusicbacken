module.exports =(sequelize,Sequelize) => {
    const Organization = sequelize.define('organization',{
        name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        city: {
            type: Sequelize.STRING,
        },
        display_name: {
            type: Sequelize.STRING
        },
        display_logo: {
            type: Sequelize.TEXT
        },
        phone_number: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        area: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        pin_code: {
            type: Sequelize.INTEGER(11)
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        is_email_verified: {
            type: Sequelize.BOOLEAN,   
            defaultValue: 0
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        is_password_reset: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        }, {
            timestamps: true,
            underscored: true
        });
      
        return Organization;
};