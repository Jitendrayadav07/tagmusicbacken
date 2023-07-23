module.exports = (sequelize,Sequelize) => {
    const Enquiry = sequelize.define("enquiries", {
        full_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        organization_name: {
            type: Sequelize.STRING
        },
        // 0 pending 1 approved 2 rejected 
        is_approved: {
            type: Sequelize.BOOLEAN,   
            defaultValue: 0
        },
        reason:{
            type: Sequelize.TEXT
        }
    }, {
        timestamps: true,
        underscored: true
    });
    return Enquiry;
}