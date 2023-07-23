module.exports =(sequelize,Sequelize) => {
    const City = sequelize.define('cities',{
        name: {
            type: Sequelize.STRING
          },
        }, {
            timestamps: true,
            underscored: true
        });
      
        return City;
};