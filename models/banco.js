const Sequelize = require("sequelize")
const sequelize = new Sequelize("projetowebII", "root", "", {
    host: "localhost",
    dialect: "mysql"
})
module.exports ={
    Sequelize,
    sequelize
}
