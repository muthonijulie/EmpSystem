const db = require('../config/database');

exports.homepage = async (req, res) => {
    db.query('select * from empdetails', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length === 0) {
                res.send("No records found");
            } else {
                res.render('./layouts/employeeHomepage', {
                    sampleData: result
                });
            }
        }
    })
}
exports.showAssignedTasks = async (req, res) => {
    var employeeId = {
        empId: req.body.emp_id
    }
    db.query('select * from tasks where emp_id=?', employeeId, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                res.send("No tasks assigned yet")
            } else {
                res.render('./layouts/employeeAssignedTasks', {
                    sampleData: result
                })
            }
        }
    })
}
exports.overdraftApplication = async (req, res) => {

}
exports.leaveApplication = async (req, res) => {

}
