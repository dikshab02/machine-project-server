const MONGOOSE = require("mongoose");
const STRING = MONGOOSE.Schema.Types.String;

const MACHINE_SCHEMA = new MONGOOSE.Schema({
    machineName: {
        type: STRING,
        required: true
    }
})

const MACHINE = MONGOOSE.model("MachineCollection" , MACHINE_SCHEMA);
module.exports = {
    MACHINE
}
