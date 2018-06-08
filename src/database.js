const Sequelize = require('sequelize');

const DB_NAME = process.env.EI_DB_NAME;
const DB_USER = process.env.EI_DB_USER;
const DB_PASS = process.env.EI_DB_PASS;
const DB_HOST = process.env.EI_DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        freezeTableName: true
    },
    operatorsAliases: false
});

const User = sequelize.define('portal_usuario', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
},
{
    timestamps: false
});

const Token = sequelize.define('authtoken_token', {
    key: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
},
{
    timestamps: false
});

Token.hasOne(User, { foreignKey: "id", targetKey: "user_id" })
User.belongsTo(Token, { foreignKey: "id", targetKey: "user_id", as: "Token" })

module.exports = { User, Token };