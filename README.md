# Beyond Vacation

![GitHub last commit](https://img.shields.io/github/last-commit/vanessabau/projectTwo) ![npm version](https://badge.fury.io/js/inquirer.svg)

Beyond Vacation is a centralized location for outdoor rental spaces. Built around the idea of vacationing while still social distancing, it's a vacation away from your (indefinite) vacation.

## Table of Contents

* [Demo](#demo)
* [Overview](#overview)
* [Usage](#usage)
    - [Accesssing Home page](#accessinghomepage)
    - [Navigating Members page](#navigatingmemberspage)
    - [Browsing Rentals](#browsingrentals)
    - [Listing Rentals](#listingrentals)
    - [Login](#login)
    - [Signup](#signup)
* [Tech and Methods Breakdown](#techandmethodbreakdown)
    - [Technology](#technology)
    - [Front-End](#frontend)
    - [Back-End](#backend)
* [Known Issues](#knownissues)
* [Contributors](#contributors)
* [Launch](#launch)

### Demo

For a [video demo]() of the web page

For the [finished web page](https://beyondvacation.herokuapp.com/)

### Overview

Once logged in, users can list outdoor locations and reserve locations, as well as view all rental spaces they've listed or reserved in one centralized location on their members page. On said members page, users can remove a rental space they listed or cancel a reservation.

The application is made up of six pages:
1. Home
2. Members
3. Browse Rentals
4. List Rental
5. Signup
6. Login

### Usage

##### Accesssing Home page

On the home page the user can either navigate using the navbar or scroll down to the two square buttons to choose `Browse Rentals` or `List Rentals`. 

If the user is not logged in, they will be redirected to the login page. Where they can login or signup.

##### Navigating Members page

Once logged in the user will be redirected to their members page where the rental spaces they have listed and the spaces they've reserved are shown.

Clicking on the arrow for the `Details` button will reveal the details of the listings and reservations. 

`Delete Listing` will remove their listing from the database.

`Delete Rental` will cancel their reservation.

##### Browsing Rentals

To access the browse function, click on `Browse Rentals` from the navbar.

On the browse page, there are four options to filter by: 
* Rental type
    - RV
    - Campsite
    - Farmland experience
    - Waterfront vista
    - Backyard Oasis
* Party size 
* Maximum price per day
* Location with bathroom facilities (Yes or No)

Choose each option one at a time to filter rental spaces and click `Submit`. 

Rental spaces with these options will be filtered out for your view.

To reserve, simply click `Reserve this location`.

##### Listing Rentals

To access the listing function, click on `List Rental` from the navbar.

The user will need to fill out a form with all of the required information before clicking submit:
* Property Name
* Rental Type
* Address
* City
* State
* 5-digit Zip code
* Price per day
* Party size
* Whether the rental space has accessable bathroom facilities
* And if the location is currently available

Once done, click `Submit`.

##### Login

Input your email and password. If credentials are wrong, page will reset.

##### Signup

Fill out form with all required information before clicking submit:
* First Name
* Last Name
* Email
* Password
* Confirm Password

Once done, click `Submit`. User will be redirected to login page.

### Tech and Methods Breakdown

##### Technology

* VS Code v1.47.1
* Node v12.16.1
* MySQL v8.0.20
* MVC Pattern
* Express-handlebars
* handlebars
* Sequelize
* req-flash
* express-session
* passport
* Bootstrap
* jQuery
* Adobe InDesign
* shields.io

##### Front-End

Handlebars with express-handlebars was used for templating. Bootstrap was the backbone html and css that the application was built off of. Adobe InDesign was used to create visual template for home page.

jQuery was used for all the functionality of the application. Ajax calls (get, post, put, delete) were used to talk to the database to pull data from Poster and User models.

##### Back-End

Database was made using MySQL and Sequelize. 

Two models make up the database: User.js and Poster.js 

User.js holds the first and last name of the user, as well as the email and password. Passport is used to protect the user's password from exposure and is used to authenticate credentials.

Poster.js holds all other information, information from the `List Rental` form, id of user (from User model) who reserved it, foreign id with User model to associate listings with users.

Handlebars-routes render the handlebars templates and related jquery file for the related template. And use middleware to protect the browser, list, and members pages from a user accessing them without loggin in first.

Api-routes was the in-between for the database and the front end. Passport was used to autheticate credentials when a user logs in. Req-flash was used to log errors to the terminal when incorrect email or password was entered. 

### Known Issues

Browse Page:
* Less than or equal to operator not working, cards will only render if options chosen exactly match info on rental space
* Choosing party size + max price per day must be submitted twice for cards to render
* Choosing rental type, party size and bathroom facilities work together at the first submit but not with max price per day included
    - All options must be chosen and submitted twice

### Contributors

* Sandra Arredondo
* Vanessa Bautista
* Saular Moaddeli
* KaiWei Shen

### Launch

Date [application](https://beyondvacation.herokuapp.com/) releases: `July 21st, 2020`
