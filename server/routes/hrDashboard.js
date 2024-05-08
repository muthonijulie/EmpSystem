const hrController= require('../controllers/hrControllers');

module.exports= (app) =>{
  app.get('/admin',hrController.showEmployeeDetails);
  app.get('/dashboard',hrController.registerEmployeeDetails);
}