const hrController= require('../controllers/hrControllers');

module.exports= (app) =>{
  app.get('/hr', hrController.showEmployeeDetails);
  app.get('/hr/employeeregistration', hrController.registerEmployeeForm);
  app.post('/hr/employeeregistration', hrController.registerEmployeeDetails);
  app.get('/hr/overdrafts', hrController.showOverdraftApplications);
  app.get('/hr/viewoverdraftapplications/:id', hrController.viewOverdraftApplications);
  app.post('/hr/reviewoverdraftapplications/:appNo', hrController.reviewOverdraftApplications);
  app.get('/hr/leaves', hrController.showLeaveApplications);
  app.get('/hr/viewleaveapplications/:id', hrController.viewLeaveApplications);
  app.post('/hr/reviewleaveapplications/:appNo', hrController.reviewLeaveApplications);
}