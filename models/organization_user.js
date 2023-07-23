
module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("organization_users", {
        fullname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        is_email_verified: {
            type: Sequelize.BOOLEAN,   
            defaultValue: 0
        },
    }, {
        timestamps: true,
        underscored: true
    });
      
    return User;
}