const MONGOOSE = require("mongoose");
const STRING = MONGOOSE.Schema.Types.String;

const LOGIN_SCHEMA = new MONGOOSE.Schema({
    email: {
        type: STRING,
        required: true
    },
    password: {
        type: STRING,
        required: true
    }
})

const LOGIN = MONGOOSE.model("LoginCollection" , LOGIN_SCHEMA);
module.exports = {
    LOGIN, LOGIN_SCHEMA
}
