const  employeeController= require('../controllers/employeeController');

module.exports = (app) => {
    app.get('/employee', employeeController.homepage);
    app.get('/employee/assignedtasks', employeeController.showAssignedTasks);
    app.get('/application/overdraft', employeeController.overdraftForm);
    app.post('/application/overdraft', employeeController.overdraftApplication);
    app.get('/application/overdraftdetails', employeeController.overdraftDetails);
    app.get('/application/leave', employeeController.leaveForm)
    app.post('/application/leave', employeeController.leaveApplication);
    app.get('/application/leavedetails', employeeController.leaveDetails);
}