const db = require('../config/database');

exports.homepage = (req, res)=>{
    res.render('./layouts/employeeHomepage');
}