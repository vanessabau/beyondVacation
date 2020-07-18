$(document).ready(() => {
  //memberListingsDiv to hold all listings by the member
  var membersListDiv = $("#member-listings");

  //memberReservationsDiv to hold all reservations by the member
  var membersResDiv = $("#member-reservations");

  //Create variables to hold data from database
  var memberListings;
  var memberReservations;

  //Click event for the delete buttons
  $(document).on("click", "button.delete", deleteList);

  // This file just does a GET request to figure out which user is logged in and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $("#email").text(data.email); 
    $("#first-name").text((data.firstName).toUpperCase());
    $("#last-name").text((data.lastName).toUpperCase());
    $("#id").text(data.id);
    getMemberListings();
    getMemberReservations();
  });

  // This function displays a message when there are no member listings
  function displayListEmpty() {
    membersListDiv.empty();
    var messageH5 = $("<h5>");
    messageH5.css({ "margin-top": "25px" });
    messageH5.html("No listings found, navigate <a href='/list'>here</a> to create a new listing.");
    membersListDiv.append(messageH5);
  };

  //function to retrieve listings by member
  function getMemberListings(){
    $.get("/api/posts/:id", function(data){
      console.log("member listings", data);
      memberListings = data;
      if(!memberListings || !memberListings.length){
        displayListEmpty();
      }else{
      for (i=0; i<memberListings.length; i++){
        //display the member's listings
        createListCard();
      }; 
      };
    });
  };

  //function to create listing card
  function createListCard(){
    var newListing = $("<div>");
      newListing.addClass("col");
      newListing.html(
        `<div class="card" style="width: 18rem; padding:0px">
            <img class="card-img-top"
              src="https://www.familyhandyman.com/wp-content/uploads/2018/02/handcrafted-log-home.jpg"
              alt="Card image cap">
            <div class="card-body">
              <p class="card-text">${memberListings[i].property_name}</p>
              <button type="button" class="btn btn-outline-success delete">Delete Listing</button>
            </div>
          </div>`
      );
      membersListDiv.append(newListing);
  };

  //This function displays a message when there are no member reservations
  function displayResEmpty() {
    membersResDiv.empty();
    var messageH5 = $("<h5>");
    messageH5.css({ "margin-top": "25px" });
    messageH5.html("No reservations found, navigate <a href='/browse'>here</a> to make a reservation.");
    membersResDiv.append(messageH5);
  };

  //function to retrieve reservations by member
  function getMemberReservations(){
    $.get("/api/posts/:id", function(data){
      console.log("member reservations", data);
      memberReservations = data;
      if(!memberReservations || !memberReservations.length){
        displayResEmpty();
      }else{
        for(j=0; j<memberReservations.length; j++){
          //Display member's reservations
        createResCard();
        }
      }
    });
  };

  //function to create reservation card
  function createResCard(){
    var newRes = $("<div>");
      newRes.addClass("col");
      newRes.html(
        `<div class="card" style="width: 18rem; padding:0px">
            <img class="card-img-top"
              src="https://www.familyhandyman.com/wp-content/uploads/2018/02/handcrafted-log-home.jpg"
              alt="Card image cap">
            <div class="card-body">
              <p class="card-text">${memberReservations[i].property_name}</p>
              <button type="button" class="btn btn-outline-success delete">Delete Rental</button>
            </div>
          </div>`
      );
      membersResDiv.append(newRes);
  };


});



//can we switch document with delete-reserve?
//$(document).on("click", "button.delete", deleteList);
function deleteList(event) {
  event.stopPropagation();
  var id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/posts/" + id
  }).then(listUser);
};

$(".delete-reserve").on("click", function listUser() { //delete list
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/posts/" + id, {
      type: "DELETE"
  }).then(
      function () {
          console.log("deleted posts", id);
          // Reload the page to get the updated list
          location.reload();
      }
  );
});