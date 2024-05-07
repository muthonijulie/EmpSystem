const db = require('../config/database');

exports.showLandingPage = (req, res)=>{
    res.render('./layouts/landing');
}