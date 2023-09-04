const MONGOOSE = require("mongoose");
const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;


const PROJECT_SCHEMA = new MONGOOSE.Schema({
    name: {
        type: STRING,
        required: true
    },
    startDate: {
        type: DATE, 
        default: Date.now
    },
    endDate: {
        type: DATE, 
        default: Date.now
    },
    allocateMachine: {
        type: OBJECT_ID, 
        ref: 'MachineCollection'
    },
    color: {
        type: STRING
    },
})

const PROJECT = MONGOOSE.model("ProjectCollection" , PROJECT_SCHEMA);
module.exports = {
    PROJECT
}
