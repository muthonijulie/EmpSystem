const manController=require('../controllers/managerController');

module.exports= (app) =>{
  app.get('/manager',manController.viewProjects);
  app.get('/manager/new-project',manController.createProjectForm);
  app.post('/manager/new-project',manController.createProject);
  app.get('/manager/tasks',manController.viewTasks);
  app.get('/manager/new-task',manController.createTaskForm);
  app.post('/manager/new-task',manController.createTask);
  app.get('/manager/assigntask/:id',manController.assignTasksForm);
  app.post('/manager/assigntask/:id',manController.assignTasks);
  app.get('/manager/tasks/unassigned',manController.viewUnassignedTasks);
  app.get('/manager/tasks/accepted',manController.viewAcceptedTasks);
  app.get('/manager/tasks/rejected',manController.viewRejectedTasks);
  app.get('/manager/progress',manController.viewTaskProgress);
}