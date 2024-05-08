const db = require('../config/database');

exports.showUsers = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Admin") {
            db.query('select * from users', (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/admin"
                    })
                } else {
                    res.render('./layouts/adminDashboardUsers', {
                        sampleData: result,
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}
exports.showUserDetails = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Admin") {
            var id = req.params.id;
            db.query('select * from users where Username=?', id, (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/admin"
                    })
                } else {
                    res.render('./layouts/adminUpdateUserRole', {
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
exports.viewAccountDetails = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Admin") {
            db.query('select * from users where username=?', req.session.user, (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/admin"
                    })
                } else {
                    res.render('./layouts/adminUserDetails', {
                        sampleData: result
                    })
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}
exports.changeRoles = async (req, res) => {
    if (req.session.user) {
        if (req.session.role === "Admin") {
            var id = req.params.username;
            var role = req.body.role;
            let params = {
                Role: role
            }
            db.query('update users set? where Username = ?;', [params, id], (err, result) => {
                if (err) {
                    res.render('./layouts/errorpage', {
                        error: err,
                        redirect: "Go back",
                        redirectLink: "/admin"
                    })
                } else {
                    res.redirect('/admin/users')
                }
            })
        } else {
            res.render('./layouts/unauthorizedAccess')
        }
    } else {
        res.redirect('/login')
    }
}