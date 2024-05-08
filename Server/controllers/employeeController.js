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
    if (req.session.user) {
        if (req.session.role === "Employee") {
            db.query('select * from tasks where emp_id=?', req.session.empId, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('./layouts/employeeAssignedTasks', {
                        sampleData: result
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login')
    }
}
exports.overdraftForm = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            db.query('select * from overdraft where emp_id=? and applicationstatus="Rejected"', req.session.empId, (err, result) => {
                if (result.length === 0) {
                    db.query('select * from empdetails', (err, result) => {
                        res.render('./layouts/overdraftApplication', {
                            sampleData: result
                        });
                    })
                } else {
                    res.redirect('/application/overdraftdetails')
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login');
    }
}
exports.overdraftApplication = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            var overdraftId = req.body.overdraftId;
            var employeeId = req.body.employeeId;
            var totalSalary = req.body.totalSalary;
            var overdraftAmount = req.body.overdraftAmount;
            let params = {
                overdraftId: overdraftId,
                emp_id: employeeId,
                total_salary: totalSalary,
                overdraftAmount: overdraftAmount,
            }
            db.query('insert into overdraft set?', params, (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/application/overdraft"
                    })
                } else {
                    res.redirect('/application/overdraftdetails', {
                        sampleData: result
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login')
    }
}
exports.overdraftDetails = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            db.query('select empdetails.emp_id, empdetails.FName, empdetails.LName, users.emp_id from empdetails left join users on empdetails.emp_id = users.emp_id where users.Username=?', req.session.user, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const retrievedEmployeeNo = result.map(data => {
                        return data.emp_id
                    })
                    db.query('select * from overdraft where emp_id=?', retrievedEmployeeNo, (err, result) => {
                        if (result.length === 0) {
                            res.redirect('/application/overdraft')
                        } else {
                            res.render('./layouts/overdraftDetails', {
                                sampleData: result
                            })
                        }
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login')
    }
}
exports.leaveForm = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            db.query('select * from leaveapplications where emp_id=? and leavestatus="Rejected', req.session.empId, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    if (result.length === 0) {
                        db.query('select * from empdetails', (err, result) => {
                            res.render('./layouts/LeaveApplication', {
                                sampleData: result
                            });
                        })
                    } else {
                        res.render('./layouts/LeaveDetails', {
                            sampleData: result
                        })
                    }
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login');
    }
}
exports.leaveApplication = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            var leaveNo = req.body.leaveId;
            var employeeNo = req.body.employeeId;
            var applicationDate = req.body.applicationDate;
            var leaveStart = req.body.leaveStart;
            var leaveEnd = req.body.leaveEnd;
            var leaveType = req.body.leaveType;
            let params = {
                leaveid: leaveNo,
                emp_id: employeeNo,
                applicationDate: applicationDate,
                leaveStart: leaveStart,
                leaveEnd: leaveEnd,
                leaveType: leaveType,
            }
            db.query('insert into leaveapplications set?', params, (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/application/leave"
                    })
                } else {
                    res.redirect('/application/leavedetails')
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login')
    }
}
exports.leaveDetails = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Employee") {
            db.query('select empdetails.emp_id, empdetails.FName, empdetails.LName, users.emp_id from empdetails left join users on empdetails.emp_id = users.emp_id where users.Username=?', req.session.user, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const retrievedEmployeeNo = result.map(data => {
                        return data.emp_id
                    })
                    db.query('select * from leaveapplications where emp_id=?', retrievedEmployeeNo, (err, result) => {
                        if (result.length === 0) {
                            res.redirect('/application/leave')
                        } else {
                            res.render('./layouts/LeaveDetails', {
                                sampleData: result
                            });
                        }
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess');
        }
    } else {
        res.redirect('/login')
    }
}
