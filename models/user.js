const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection.js");

class user extends Model {
  //COMPARE PASSWORD HASHES WHEN USER LOGS IN
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    coins: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    coincode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    videoon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    tempCoupon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        //HASH PASSWORD BEFORE ADDING NEW USER TO DATABASE
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = user;
