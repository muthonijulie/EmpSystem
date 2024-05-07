const hrController = require('../controllers/hrControllers');

module.exports = (app) => {
    app.get('/', hrController.showLandingPage);
}