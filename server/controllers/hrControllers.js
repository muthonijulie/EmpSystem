const db = require('../config/database');


exports.showEmployeeDetails = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "HR") {
      db.query('select * from empdetails', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render = ('.layouts/hrHomepage', {
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
exports.registerEmployeeForm = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "HR") {
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
    if (req.session.role === "HR") {
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
    if (req.session.role == "employee") {
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
