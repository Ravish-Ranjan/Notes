const { connect } = require("mongoose");

const connectDb = async (url) => {
    return connect(url);
};

module.exports = connectDb;
