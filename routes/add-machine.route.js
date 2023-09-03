const MACHINE_CONTROLLER = require('../controllers/add-machine');
const VALIDATE_ADMIN = require('../config/admin-auth.config')

module.exports = (APP) => {
    APP.post('/add-machine', VALIDATE_ADMIN, MACHINE_CONTROLLER.addMachine);
    APP.get('/machine/:machineId', VALIDATE_ADMIN, MACHINE_CONTROLLER.getMachines);
    APP.get('/all-machines', MACHINE_CONTROLLER.getAllMachines)
}
