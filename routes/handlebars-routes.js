// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
//Routes
//===============================================================================
module.exports = function(app) {
  //database call
  app.get("/", (req, res) => {
    //grabs the data from the database from the Poster model/table and renders it on index handlebars
    db.Poster.findAll().then(data => {
      //console.log(data);
      res.render("index", {
        quote: data
      });
    });
  });
  //checks to see if user is logged in, if they aren't isAuthenticated middleware redirects them to login page
  //if user is logged in the list page renders
  app.get("/list", isAuthenticated, (req, res) => {
    res.render("list", {
      js: "listRental.js"
    });
  });
  //checks to see if user is logged in, if they aren't isAuthenticated middleware redirects user to login page
  //if user is logged in the reserve handlebars template will render
  app.get("/browse", isAuthenticated, (req, res) => {
    res.render("reserve", {
      js: "reserve.js"
    });
  });
  //renders login page
  app.get("/login", (req, res) => {
    res.render("login", {
      js: "login.js"
    });
  });
  //renders signup page
  app.get("/signup", (req, res) => {
    res.render("signup", {
      js: "signup.js"
    });
  });
  //checks to see if user is logged in, if they aren't isAuthenticated middleware redirects user to login page
  //if user is logged in the members handlebars template will render
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members", {
      js: "members.js"
    });
  });
};
