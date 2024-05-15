const db = require('../config/database');

// Project Management functions
exports.createProjectForm = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      res.render('./layouts/createProject');
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.createProject = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      var projectNo = req.body.projectId;
      var projectTitle = req.body.pTitle;
      let params = {
        projectid: projectNo,
        pTitle: projectTitle
      }
      db.query("insert into projects set?", params, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/manager')
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewProjects = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      db.query('select * from projects', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render('./layouts/managerHomepage', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
// Task management functions
exports.createTaskForm = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      db.query('Select * from projects', (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.render('./layouts/createTask', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.createTask = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      var taskNo = req.body.taskId;
      var taskTitle = req.body.tTitle;
      var projectid = req.body.projectId;
      let params = {
        TaskID: taskNo,
        TaskName: taskTitle,
        ProjectId: projectid
      }
      db.query("insert into tasks set?", params, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/manager/tasks')
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.assignTasksForm = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      var taskId = req.params.id;
      db.query('select * from tasks where TaskID=?', taskId, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          db.query('select * from empdetails', (err, result2) => {
            if (err) {
              console.log(err)
            } else {
              res.render('./layouts/assignTask', {
                sampleData: result,
                sampleData2: result2
              })
            }
          })
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.assignTasks = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      var emp_Id = req.body.emp_id;
      var taskId = req.params.id;
      let params = {
        emp_Id: emp_Id
      }
      db.query('update tasks set? where TaskID=?', [params, taskId], (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.redirect('/manager/tasks');
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewTasks = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      db.query('select * from tasks', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render('./layouts/Tasks', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewAcceptedTasks = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      db.query('select * from tasks where TaskStatus="Accepted"', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render('./layouts/Tasks', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewRejectedTasks = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      db.query('select * from tasks where TaskStatus="Rejected"', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render('./layouts/Tasks', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewUnassignedTasks = async (req, res) => {
  if (req.session.user) {
    if (req.session.role === "Manager") {
      db.query('select * from tasks where emp_id is null', (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render('./layouts/unassignedTask', {
            sampleData: result
          });
        }
      })
    } else {
      res.render('./layouts/unauthorizedAccess');
    }
  } else {
    res.redirect('/login');
  }
}
exports.viewTaskProgress = async (req, res) => {
  db.query('select * from tasks', (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      if (result.length === 0) {
        res.send("No data found!");
      }
      else {
        res.render('', {
          sampleData: result
        });
      }
    }
  })
}