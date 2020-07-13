// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

//Routes
//===============================================================================
module.exports = function(app) {
    app.get("/", (req, res) => {
        res.render("index");
    });
    //checks to see if user is logged in, if they aren't isAuthenticated middleware redirects them to login page
    //if user is logged in the list page renders
    app.get("/list", isAuthenticated, (req, res) => {
        res.render("list");
    });

    app.get("/browse", isAuthenticated, (req, res) => {
       res.render("browse");
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/signup", (req, res) => {
        res.render("signup");
    })

    // app.get("/profile", (req, res) => {
    //     res.render("profile")
    // })
};