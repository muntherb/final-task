module.exports = (sequelize, Sequelize) =>{
    const Flight = sequelize.define("flight",{
        flightN: {
            type: Sequelize.STRING
        },
        flightD: {
            type: Sequelize.STRING
         },
         takeoff: {
             type: Sequelize.BOOLEAN
         },
         arrival: {
             type: Sequelize.TIME
         }
        });

        return Flight;
}
