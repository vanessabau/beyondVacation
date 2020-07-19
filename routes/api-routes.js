// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }),
    (req, res) => {
      // Sending back a password, even a hashed password, isn't a good idea
      console.log(req.user);
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  );

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
      .then(() => {
        console.log("signup success!");
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log("signup error!");
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      console.log("trying!");
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      //console.log(req.user);
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user.id
      });
      //console.log(req.body);
    }
  });
  ///////////////// ABOVE = user auth/login/signup ------ BELOW = routes for post, viewing, and updating listings

  // Route to post new listing:
  app.post("/api/posts", (req, res) => {
    db.Poster.create(req.body, { include: db.User }).then(list => {
      res.json(list);
      console.log(list);
    });
  });

  // Route to get all new listings:
  app.get("/api/posts", (req, res) => {
    db.Poster.findAll({ include: db.User }).then(list => {
      res.json(list);
    });
  });

  //Route to grab all listings by a member
  app.get("/api/posts/members/:id", (req, res) => {
    db.Poster.findAll({
      where: { UserId: req.params.id },
      include: db.User
    }).then(list => {
      res.json(list);
    });
  });

  //Route to grab all listings by a member
  app.get("/api/posts/membersRes/:id", (req, res) => {
    db.Poster.findAll({
      where: { reservedBy: req.params.id },
      include: db.User
    }).then(list => {
      res.json(list);
    });
  });

  // Route to get fully filtered listings

  //this is for the filter, REMEMBER THIS DID ALL 24 SCENARIOS and ONLY 4 edits
  app.post("/api/posts/filtered", (req, res) => {
    console.log("req.body", req.body)
    if (!req.body.location) {
      delete req.body.location
    }
    if (!req.body.price) {
      delete req.body.price
    }
    if (!req.body.size_of_party) {
      delete req.body.size_of_party
    }
    if (!req.body.facility) {
      delete req.body.facility
    }
    db.Poster.findAll({
      where: req.body
    }).then(list => {
      res.json(list);
    });
  });

  // Route to get filtered listings based on category:
  app.get("/api/posts/:location", (req, res) => {
    db.Poster.findAll({ where: { location: req.params.location } }).then(
      list => {
        res.json(list);
      }
    );
  });

  // Route to get filtered listings based on price:
  app.get("/api/posts/:price", (req, res) => {
    db.Poster.findAll({ where: { price: { $lte: req.params.price } } }).then(
      list => {
        res.json(list);
      }
    );
  });

  // Route to get filtered listings based on facilities:
  app.get("/api/posts/facility", (req, res) => {
    db.Poster.findAll({ where: { facility: true } }).then(list => {
      res.json(list);
    });
  });

  // Route to get filtered listings based on party size:
  app.get("/api/posts/:size", (req, res) => {
    db.Poster.findAll({
      where: { size_of_party: { $gte: req.params.size } }
    }).then(list => {
      res.json(list);
    });
  });

  // Route to get one listing based on id:
  // app.get("/api/posts/:id", (req, res) => {
  //   db.Poster.findAll(
  //     { where: { UserId: req.params.id }, include: db.User
  //    }).then((list) => {
  //     res.json(list);
  //   });
  //   console.log("api-routes, list: " + list);
  // })

  // Route to update for when a listing is reserved:
  app.put("/api/posts", (req, res) => {
    db.Poster.update({ reserved: true }, { where: { id: req.body.id } }).then(list => {
      res.json(list);
    });
  });

  // Route to delete a listing:
  app.delete("/api/posts/:id", (req, res) => {
    db.Poster.destroy({ where: { id: req.params.id } }).then(list => {
      res.json(list);
    });
  });
};
