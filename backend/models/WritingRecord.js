const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const WritingRecord = sequelize.define("WritingRecord", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    writing_question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    original_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    processed_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("correction", "translation"),
        allowNull: false,
    }
}, {
    tableName: "writing_records",
    timestamps: true,
});

module.exports = WritingRecord;
