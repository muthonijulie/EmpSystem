const db = require('../config/database');

exports.showEmployeeDetails = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      db.query('select * from empdetails', (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.render('./layouts/hrHomepage', {
            sampleData: result
          });
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
exports.registerEmployeeForm = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      res.render('./layouts/hrRegister')
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login')
  }
}
exports.registerEmployeeDetails = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      var emp_Id = req.body.emp_id;
      var fName = req.body.FName
      var lName = req.body.LName
      var dob = req.body.DOB
      var email = req.body.Email
      var phoneNo = req.body.PhoneNo
      var dateHired = req.body.HireDate
      let params = {
        emp_Id: emp_Id,
        FName: fName,
        LName: lName,
        DOB: dob,
        Email: email,
        PhoneNo: phoneNo,
        HireDate: dateHired,
      }
      db.query('insert into empdetails set?', params, (err, result) => {
        if (err) {
          res.render('./layouts/errorpage', {
            error: err,
            redirect: "Go back",
            redirectLink: "/application/overdraft"
          })
        } else {
          res.render = ('.layouts/registerDetails', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login')
  }
}

exports.updateEmployeeDetails = async (req, res) => {
  if (req.session.user) {
    if (req.session.role == "hr") {
      var emp_Id = req.body.emp_id;
      var fName = req.body.FName
      var lName = req.body.LName
      var dob = req.body.DOB
      var email = req.body.Email
      var phoneNo = req.body.PhoneNo
      var dateHired = req.body.HireDate
      let params = {
        emp_Id: emp_Id,
        fName: FName,
        lName: LName,
        dob: DOB,
        email: Email,
        phoneNo: PhoneNo,
        dateHired: HireDate,
      }
    }
  }
  db.query('UPDATE empdetails SET ? WHERE emp_Id = ?', [params, emp_Id], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      if (result.length === 0) {
        res.send("Employee Not found!");
      }
      else {
        res.render = ('.layouts/updateDetails', {
          sampleData: result
        });
      }
    }
  })
}
exports.showOverdraftApplications = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      db.query('select * from overdraft', (err, result) => {
        if (err) {
          return err;
        } else {
          res.render('./layouts/hrViewOverdraft', {
            sampleData: result,
          })
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess')
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewOverdraftApplications = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      var id = req.params.id;
      db.query('select * from overdraft where overdraftId=?;', id, (err, result) => {
        if (err) {
          res.render('./layouts/errorpage', {
            error: err,
            redirect: "Go back",
            redirectLink: "/hr"
          })
        } else {
          res.render('./layouts/hrReviewOverdraft', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess')
    }
  } else {
    res.redirect('/login')
  }
}
exports.reviewOverdraftApplications = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      var status = req.body.Status;
      var id = req.params.appNo;
      let params = {
        ApplicationStatus: status
      }
      db.query('Update overdraft set? where overdraftid=?', [params, id], (err, result) => {
        if (err) {
          res.render('./layouts/errorpage', {
            error: err,
            redirect: "Go back",
            redirectLink: "/hr"
          })
        } else {
          res.redirect('/hr/overdrafts')
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess')
    }
  } else {
    res.redirect('/login')
  }
}
exports.showLeaveApplications = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      db.query('select * from leaveapplications', (err, result) => {
        if (err) {
          return err;
        } else {
          res.render('./layouts/hrViewLeave', {
            sampleData: result,
          })
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess')
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewLeaveApplications = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      var id = req.params.id;
      db.query('select * from leaveapplications where leaveid=?;', id, (err, result) => {
        if (err) {
          res.render('./layouts/errorpage', {
            error: err,
            redirect: "Go back",
            redirectLink: "/hr"
          })
        } else {
          res.render('./layouts/hrReviewLeave', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess')
    }
  } else {
    res.redirect('/login')
  }
}
exports.reviewLeaveApplications = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "hr") {
      var status = req.body.Status;
      var id = req.params.appNo;
      let params = {
        leaveStatus: status
      }
      db.query('Update leaveapplications set? where leaveid=?', [params, id], (err, result) => {
        if (err) {
          res.render('./layouts/errorpage', {
            error: err,
            redirect: "Go back",
            redirectLink: "/hr"
          })
        } else {
          res.redirect('/hr/leaves')
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess')
    }
  } else {
    res.redirect('/login')
  }
}