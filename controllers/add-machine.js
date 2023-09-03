const MACHINE_COLLECTION = require('mongoose').model("MachineCollection");

module.exports = {
    addMachine: (req,res) =>{
        try {
            MACHINE_COLLECTION.insertMany({
                machineName: req.body.machineName
            })
            .then((machine)=>{
                res.send({
                    isError: false,
                    message: req.body.machineName + ' machine is added' ,
                    data: machine            
                })
            })
        }
        catch(error){
            res.send({
                isError: true,
                message: '',
                data: error.message,
              });
        }
    },
    getMachines: (req,res) =>{
        const machineId = req.params.machineId;
        try{
            MACHINE_COLLECTION.findById(machineId)
            .then((machine)=>{
                res.send({
                    isError: false,
                    message: "",
                    data: machine,
                  });
            })
        }
        catch(error) {
            res.status(500).json({
                isError: true,
                message: "Internal server error",
                data: error.message,
              });
        }
    },
    getAllMachines: (req,res) =>{
        try {
            MACHINE_COLLECTION.find({})
            .then((response) =>{
                res.send({
                    isError: false,
                    data: response
                })
            })
        }
        catch(error) {
            res.send({
                isError: true,
                data: error
            })
        }
    }
}
