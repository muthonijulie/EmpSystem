const db = require('../config/database');

exports.homepage = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            db.query('select * from empdetails', (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    if (result.length === 0) {
                        res.render('./layouts/employeeHomepage', {
                            sampleData: result
                        });
                    } else {
                        res.render('./layouts/employeeHomepage', {
                            sampleData: result
                        });
                    }
                }
            })
        }
        else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}
exports.showAssignedTasks = async (req, res) => {
    db.query('select * from tasks where emp_id=?', req.session.empId, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('./layouts/employeeAssignedTasks', {
                sampleData: result
            })
        }
    })
}
exports.overdraftApplication = async (req, res) => {

}
exports.leaveApplication = async (req, res) => {

}
