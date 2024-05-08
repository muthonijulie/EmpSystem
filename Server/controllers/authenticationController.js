const { hasSubscribers } = require('diagnostics_channel');
const db = require('../config/database');
const bycrpt = require('bcrypt');

exports.showSigninPage = async (req, res) => {
    res.render('./layouts/authentication', {
        pageTitle: "Sign In",
        pageLink: "/signin"
    });
}
exports.showLoginPage = async (req, res) => {
    if (req.session.user) {
        switch (req.session.role) {
            case "Employee":
                res.redirect('/employee')
                break;
            case "HR":
                res.redirect('/hr')
                break;
            case "Manager":
                res.redirect('/manager')
                break;
            default:
                break;
        }
    }
    else {
        res.render('./layouts/authentication', {
            pageTitle: "Log in",
            pageLink: "/login"
        })
    }

}
exports.createUser = async (req, res) => {
    try {
        const username = req.body.username;
        const hashedPassword = await bycrpt.hash(req.body.password, 10);
        let params = {
            Username: username,
            Password: hashedPassword
        }
        db.query('insert into users set?', params, (err, result) => {
            if (err) {
                res.render('./layouts/errorpage', {
                    error: err,
                    redirect: "Go back",
                    redirectLink: "/signin"
                })
            } else {
                res.redirect('/login');
            }
        })
        req.session.user = username;
        req.session.role = "employee";
    } catch (error) {
        res.send(error);
    }
}
exports.authenticateUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query('select * from users where username=?', username, async (err, result) => {
        if (err) {
            res.render('./layouts/errorpage', {
                error: err,
                redirect: "Go back",
                redirectLink: "/login"
            })
        } else {
            if (result.length === 0) {
                res.render('./layouts/errorpage', {
                    error: "User not found",
                    redirect: 'Go back',
                    redirectLink: "/login"
                })
            } else {
                try {
                    const retrievedHashedPassword = result.map(data => data.Password);
                    const hashedPassword = retrievedHashedPassword.toString();
                    const retrievedRole = result.map(data => data.Role);
                    const userRole = retrievedRole.toString();
                    const empId = result.map(data => data.emp_id).toString();
                    if (await bycrpt.compare(password, hashedPassword)) {
                        req.session.user = username;
                        req.session.role = userRole;
                        req.session.empId = empId;
                        switch (userRole) {
                            case "Employee":
                                res.redirect('/employee')
                                break;
                            case "hr":
                                res.redirect('/hr')
                                break;
                            case "Manager":
                                res.redirect('/manager')
                                break;
                            case "Admin":
                                res.redirect('/admin')
                                break;
                            default:
                                break;
                        }
                    } else {
                        res.render('./layouts/errorpage', {
                            error: "Incorrect password",
                            redirect: "Go back",
                            redirectLink: "/login"
                        })
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    })
}
exports.changePasswordForm = async (req, res) => {
    if (req.session.user) {
        var username = req.params.username;
        db.query('select * from users where Username=?', username, (err, result) => {
            if (err) {
                throw err
            } else {
                res.render('./layouts/userChangePassword', {
                    sampleData: result
                });
            }
        })
    } else {
        res.redirect('/login')
    }
}
exports.changePassword = async (req, res) => {
    if (req.session.user) {
        var username = req.params.username;
        const hashedPassword = await bycrpt.hash(req.body.password, 10);
        let params = {
            Password: hashedPassword
        }
        db.query('update users set? where Username = ?;', [params, username], (err, result) => {
            if (err) {
                res.render('./layouts/errorpage', {
                    error: err,
                    redirect: "Go back",
                    redirectLink: "/changeUserPassword/:username"
                })
            } else {
                req.session.destroy(err => {
                    if (err) {
                        res.render('./layouts/errorpage', {
                            error: "Incorrect password",
                            redirect: "Go back",
                            redirectLink: "/login"
                        })
                    } else {
                        res.redirect("/login")
                    }
                })
            }
        })
    } else {
        res.redirect('/login')
    }
}
exports.logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err
        } else {
            res.redirect('/')
        }
    })
}
exports.viewUserDetails = async (req, res) => {
    if (req.session.user) {
        db.query('select * from users where username=?', req.session.user, (err, result) => {
            if (err) {
                res.render('./layouts/errorpage', {
                    error: "Incorrect password",
                    redirect: "Go back",
                    redirectLink: "/userdetails"
                })
            } else {
                res.render('./layouts/userDetails', {
                    sampleData: result
                })
            }
        })
    } else {
        res.redirect('/login')
    }
}