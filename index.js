const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(session({
    secret: "mysecret",
    resave: false, 
    saveUninitialized: true
}))

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/routes/authentication')(app);
require('./server/routes/hrDashboard')(app);
require('./server/routes/employeeDashboard')(app);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
})
app.get('/landing', (req, res) => {
    res.sendFile(__dirname + '/src/landing.html');
})
app.get('/leave', (req, res) => {
    res.sendFile(__dirname + '/src/leave.html');
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/src/login.html');
})
app.get('/overdraft', (req, res) => {
    res.sendFile(__dirname + '/src/overdraft.html');
})
app.get('/payroll', (req, res) => {
    res.sendFile(__dirname + '/src/payroll.html');
})
app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/src/profile.html');
})
app.get('/task', (req, res) => {
    res.sendFile(__dirname + '/src/task.html');
})
app.get('/logout', (req, res)=>{
    res.redirect('/');
})
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on port " + port);
    }
})