$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    //$("#email").text(data.email); figure out where in members hbs to grab
    //$("#first-name").text(data.firstName);
    //$("#last-name").text(data.lastName);
  });
});
