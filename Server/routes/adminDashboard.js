const adminController = require('../controllers/adminController');

module.exports = (app)=>{
    app.get('/admin', adminController.showUsers);
    app.get('/admin/userdetails', adminController.viewAccountDetails);
    app.get('/admin/changeroles/:id', adminController.showUserDetails);
    app.post('/admin/changeroles/:username', adminController.changeRoles);
}