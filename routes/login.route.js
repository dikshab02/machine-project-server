const LOGIN_CONTROLLER = require('../controllers/login');
const VALIDATE_LOGIN = require('../config/login-auth.config');

module.exports = (APP) => {
    APP.post('/login', VALIDATE_LOGIN ,LOGIN_CONTROLLER.login);
}

