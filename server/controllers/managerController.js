
const db= require('../config/database');

exports.assignTasks= async (req,res)=>{
  if (req.session.user){
    if (req.session.role =="employee") {
      var emp_Id = req.body.emp_id;
      var taskname = req.body.Taskname
      var taskId = req.body.TaskID
     
       let params = {
        emp_Id: emp_Id ,
        taskName: Taskname,
        taskId: TaskID,
        
       }
    }
  }
  db.query('insert into tasks set?',params,(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/assignTasks',{
        sampleData: result
      });
    }
  }
  })

}

exports.viewTasks= async (req,res)=>{
 
  db.query('select * from tasks',(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/taskStatus',{
        sampleData: result
      });
    }
  }
  })
}
exports.viewAcceptedTasks= async (req,res)=>{
 
  db.query('select * from tasks',(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/taskStatus',{
        sampleData: result
      });
    }
  }
  })
}
exports.viewRejectedTasks= async (req,res)=>{
 
  db.query('select * from tasks',(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/taskStatus',{
        sampleData: result
      });
    }
  }
  })
}
exports.viewTaskProgress= async (req,res)=>{
 
  db.query('select * from tasks',(err, result)=> {
    if (err){
      console.log(err)
    }
    else{
      if (result.length === 0){
        res.send("No data found!");}
    else{
      res.render=('.layouts/taskStatus',{
        sampleData: result
      });
    }
  }
  })
}