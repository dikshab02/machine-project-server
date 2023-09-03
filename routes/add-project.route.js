const PROJECT_CONTROLLER = require('../controllers/add-project')

module.exports = (APP) => {
    APP.post('/add-project', PROJECT_CONTROLLER.addProject)
}
