const db=require('../config/database');


exports.showEmployeeDetails= async (req,res)=>{
 
  db.query('select * from empdetails',(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/registerDetails',{
        sampleData: result
      });
    }
  }
  })

} 
exports.registerEmployeeDetails= async (req,res)=>{
  if (req.session.user){
    if (req.session.role =="employee") {
      var emp_Id = req.body.emp_id;
      var fName = req.body.FName
      var lName = req.body.LName
      var dob = req.body.DOB
      var email = req.body.Email
      var phoneNo = req.body.PhoneNo
      var dateHired = req.body.HireDate
       let params = {
        emp_Id: emp_Id ,
        fName: FName,
        lName: LName,
        dob: DOB,
        email: Email,
        phoneNo: PhoneNo,
        dateHired: HireDate,
       }
    }
  }
  db.query('insert into empdetails set?',params,(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/registerDetails',{
        sampleData: result
      });
    }
  }
  })

}

exports.updateEmployeeDetails = async (req, res) => {
  if (req.session.user){
    if (req.session.role =="employee") {
      var emp_Id = req.body.emp_id;
      var fName = req.body.FName
      var lName = req.body.LName
      var dob = req.body.DOB
      var email = req.body.Email
      var phoneNo = req.body.PhoneNo
      var dateHired = req.body.HireDate
       let params = {
        emp_Id: emp_Id ,
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
        if (err){
          console.log(err)
        }
        else{
          if (result.length === 0){
            res.send("Employee Not found!");}
        else{
          res.render=('.layouts/updateDetails',{
            sampleData: result
          });
        }
      }
      })
    }
