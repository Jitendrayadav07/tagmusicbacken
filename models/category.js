module.exports =(sequelize,Sequelize) => {
    const Category = sequelize.define('categories',{
        name: {
            type: Sequelize.STRING
          },
        }, {
            timestamps: true,
            underscored: true
        });
      
        return Category;
};