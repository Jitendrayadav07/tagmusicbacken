module.exports =(sequelize,Sequelize) => {
    const Role = sequelize.define('roles',{
        name: {
            type: Sequelize.STRING
        },
        }, {
            timestamps: true,
            underscored: true
        });
      
        return Role;
};