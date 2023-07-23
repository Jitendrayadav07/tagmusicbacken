module.exports =(sequelize,Sequelize) => {
    const CustomerDetails = sequelize.define('customers',{
        customer_full_name: {
            type: Sequelize.STRING
        },
        performer_id: {
            type: Sequelize.INTEGER
        },
        show_genre: {
            type: Sequelize.STRING
        },
        price_per_request: {
            type: Sequelize.STRING
        },
        song_request: {
            type: Sequelize.STRING
        },
        special_message: {
            type: Sequelize.TEXT
        },
        payment_method: {
            type: Sequelize.STRING
        },
        mobile_number: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        }
        }, {
            timestamps: true,
            underscored: true
        });
      
        return CustomerDetails;
};