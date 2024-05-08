const hrController= require('../controllers/hrControllers');

module.exports= (app) =>{
  app.get('/hr', hrController.showEmployeeDetails);
  app.get('/hr/employeeregistration', hrController.registerEmployeeDetails);
}