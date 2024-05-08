const manController=require('../controllers/managerController');

module.exports= (app) =>{
  app.get('/admin/assign',manController.assignTasks);
  app.get('/admin/status',manController.viewTasks);
  app.get('/admin/status',manController.viewAcceptedTasks);
  app.get('/admin/status',manController.viewRejectedTasks);
  app.get('/admin/progress',manController.viewTaskProgress);
}