module.exports =(sequelize,Sequelize) => {
    const OutletPanel = sequelize.define('outlet_panels',{
        artist_name: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        price_per_request: {
            type: Sequelize.INTEGER
        },
        }, {
            timestamps: true,
            underscored: true
        });
      
        return OutletPanel;
};