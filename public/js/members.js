$(document).ready(() => {
  //memberListingsDiv to hold all listings by the member
  var membersListDiv = $("#member-listings");

  //memberReservationsDiv to hold all reservations by the member
  var membersResDiv = $("#member-reservations");

  //Create variables to hold data from databases
  var memberListings;
  var memberReservations;

  //Click event for the delete buttons
  //$(document).on("click", "button.delete", deleteList);

  //GET request to figure out which user is logged in, update the HTML, and initialize functions
  $.get("/api/user_data").then(data => {
    $("#email").text(data.email);
    $("#first-name").text((data.firstName).toUpperCase());
    $("#last-name").text((data.lastName).toUpperCase());
    $("#id").text(data.id);

    getMemberListings();
    getMemberReservations();
  });

  /////////////////////////// Retrieve Member Listing functions below /////////////////////////

  // This function displays a message when there are no member listings
  function displayListEmpty() {
    membersListDiv.empty();
    var messageH5 = $("<h5>");
    messageH5.css({ "margin-top": "25px" });
    messageH5.html("No listings found, navigate <a href='/list'>here</a> to create a new listing.");
    membersListDiv.append(messageH5);
  };

  //function to retrieve listings by member
  function getMemberListings() {
    $.get("/api/user_data").then((userData) => {
      console.log('userData: ' + userData);
      console.log("userData.id" + userData.id);

      $.get("/api/posts/members/" + userData.id, function (data) {

        console.log("member listings", data);
        memberListings = data;
        if (!memberListings || !memberListings.length) {
          displayListEmpty();
        } else {
          //Loop through array of data from Posters table and display the member's listings
          for (i = 0; i < memberListings.length; i++) {
            createListCard();
          };
        };
      });
    })
  };

  //function to create listing card
  function createListCard() {
    //Dynamically create div
    var newListing = $("<div>");
    newListing.addClass("col");

    //Store listing data and image source in variables
    var locationCol = memberListings[i].location;
    var imgSrc;

    //Switch statement to handle image selection based on location name
    switch (locationCol) {
      case "RV":
        imgSrc = "../images/AdobeStock_rv.jpeg";
        break;
      case "Campsites":
        imgSrc = "../images/AdobeStock_default.jpeg";
        break;
      case "Farmland":
        imgSrc = "../images/AdobeStock_farmland.jpeg";
        break;
      case "Waterfront":
        imgSrc = "../images/AdobeStock_waterfront.jpeg";
        break;
      case "Backyard":
        imgSrc = "../images/AdobeStock_backyard.jpeg";
        break;
      default:
        imgSrc = "../images/AdobeStock_campsite.jpeg";
    };

    //Dynamically create html for each listing
    newListing.html(
      `<div class="card" style="width: 18rem; padding:0px">
          <img class="card-img-top"
            src=${imgSrc}
            alt="Card image cap">
          <div class="card-body">
            <h6 class="card-text" style="color: #666666">${memberListings[i].property_name}</h6>
            <div class="btn-group">
              <button type="button" class="btn btn-success">Details</button>
              <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span></button>
            <div class="dropdown-menu" id="dMRes">
              <a class="dropdown-item" href="#">${memberListings[i].location}</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">${memberListings[i].address}, ${memberListings[i].city}, ${memberListings[i].state}</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">$${memberListings[i].price}/ Per day</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Maximum ${memberListings[i].size_of_party} people</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Bathrooms available: ${memberListings[i].facility}</a>
            </div>
          </div>
            <button type="button" class="btn btn-outline-success delete">Delete Listing</button>
          </div>
        </div>`
    );
    //Append each div 
    membersListDiv.append(newListing);
  };


  /////////////////////////// Retrieve Member Reservations functions below /////////////////////////


  //This function displays a message when there are no member reservations
  function displayResEmpty() {
    membersResDiv.empty();
    var messageH5 = $("<h5>");
    messageH5.css({ "margin-top": "25px" });
    messageH5.html("No reservations found, navigate <a href='/browse'>here</a> to make a reservation.");
    membersResDiv.append(messageH5);
  };

  //function to retrieve reservations by member
  function getMemberReservations() {
    //Retrieve user data. The id from the Users table matches the UserId from the Posters table
    $.get("/api/user_data").then((userData) => {
      //Retrieve posts rented by the member
      $.get("/api/posts/membersRes/" + userData.id, function (data) {
        //Testing
        console.log("member reservations", data);
        //If there are no posts matching that id run displayResEmpty()
        memberReservations = data;
        if (!memberReservations || !memberReservations.length) {
          displayResEmpty();
        } else {
          for (j = 0; j < memberReservations.length; j++) {
            //Loop through posts and display member's reservations
            createResCard();
          };
        };
      });
    });
  };

  //function to create reservation card
  function createResCard() {
    //Dynamically create div
    var newRes = $("<div>");
    newRes.addClass("col");
    //Store data and image information in variables
    var locationCol = memberReservations[j].location;
    var imgSrc;

    //Select image to load based on location name
    switch (locationCol) {
      case "RV":
        imgSrc = "../images/AdobeStock_rv.jpeg";
        break;
      case "Campsites":
        imgSrc = "../images/AdobeStock_default.jpeg";
        break;
      case "Farmland":
        imgSrc = "../images/AdobeStock_farmland.jpeg";
        break;
      case "Waterfront":
        imgSrc = "../images/AdobeStock_waterfront.jpeg";
        break;
      case "Backyard":
        imgSrc = "../images/AdobeStock_backyard.jpeg";
        break;
      default:
        imgSrc = "../images/AdobeStock_campsite.jpeg";
    };

    //Dynamically render Member reservations cards
    newRes.html(
      `<div class="card" style="width: 18rem; padding:0px">
        <img class="card-img-top"src=${imgSrc}>
        <div class="card-body">
          <h6 class="card-text" style="color: #666666">${memberReservations[j].property_name}</h6>
          <div class="btn-group">
            <button type="button" class="btn btn-success">Details</button>
            <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <div class="dropdown-menu" id="dMRes">
              <a class="dropdown-item" href="#">${memberReservations[j].location}</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">${memberReservations[j].address}, ${memberReservations[j].city}, ${memberReservations[j].state}</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">$${memberReservations[j].price}/ Per day</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Maximum ${memberReservations[j].size_of_party} people</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Bathrooms available: ${memberReservations[j].facility}</a>
            </div>
          </div>
          <button type="button" class="btn btn-outline-success delete">Delete Rental</button>
        </div>
      </div>`
    );
    //Append cards 
    membersResDiv.append(newRes);
  };
});

////////////////////////////////////// Delete Function Below //////////////////////////////////////

// //can we switch document with delete-reserve?
// //$(document).on("click", "button.delete", deleteList);
// function deleteList(event) {
//   event.stopPropagation();
//   var id = $(this).data("id");
//   $.ajax({
//     method: "DELETE",
//     url: "/api/posts/" + id
//   }).then(listUser);
// };

// $(".delete-reserve").on("click", function listUser() { //delete list
//   var id = $(this).data("id");

//   // Send the DELETE request.
//   $.ajax("/api/posts/" + id, {
//       type: "DELETE"
//   }).then(
//       function () {
//           console.log("deleted posts", id);
//           // Reload the page to get the updated list
//           location.reload();
//       }
//   );
// });