/* eslint-disable prettier/prettier */
$(document).ready(() => {

  const reserveForm = $("#reserve-button");
  const rentalReserve = $("#list-selections");
  const priceReserve = $("#inputPrice");
  const partyReserve = $("#inputPartySize");
  const facilityReserve = $("#facility");

  // When the form is submitted, we validate there's an name and location entered
  reserveForm.on("click", (event) => {
    event.preventDefault();
        
    const userData = {
      rental: rentalReserve.val(),
      price: priceReserve.val(),
      party: partyReserve.val(),
      facility: facilityReserve.val()
    };

    // If we have an name and location we run the loginUser function and clear the form
    listUser(userData.rental, userData.price, userData.party, userData.facility);
    rentalReserve.val("");
    priceReserve.val("");
    partyReserve.val("");
    facilityReserve.val("");
  });

  // Function to filter listings in browse - UNDER CONSTRUCTION
  function listUser(rental, price, party, facility) { 
    console.log("test");
        
    $.post("/api/posts/filtered", {
      location: rental,
      price: price,
      size_of_party: party,
      facility: facility
    })
      .then((results) => {
        console.log(results);
        browseDiv.empty();
        for (i = 0; i < results.length; i++) {
                    
          displayRental(results[i]);
        }
      });
  
  }

  //browseDiv to hold all rental cards
  const browseDiv = $("#browse-rentals");

  //variable to hold data from database
  let rentalData;

  //Click event for the reserve button
  $(document).on("click", "button.reserve", reserveRental);


  /////////////////////////// Functions to populate and display all listings for rent ////////////////////////
   
  //Get request to retrieve data from Posts table and display cards
  $.get("/api/posts")
  .then(data => {
    console.log("rentals", data);
    rentalData = data;
    console.log("listingData:", rentalData);
    if (!rentalData || !rentalData.length) {
      displayNoRentals();
    } else {
      for (i = 0; i < rentalData.length; i++) {
        displayRental(rentalData[i]);
      }
    }
  });
  
  //Reserve rental function updates status in database to "reserved" when button is clicked
  function reserveRental() {

    console.log("test");
    const dataId = $(this).attr("data-id");

    console.log(dataId);
    const dataObject = {};

    dataObject.id = dataId;
    $.get("/api/user_data").then(userData =>{
      $.ajax({
        url: "/api/posts/"+userData.id,
        type: "PUT",
        data: dataObject,

      }).then(() => {
        console.log("success");
        window.location.replace("/members");
      });
      //put content here, for now console.log
      console.log("Rental Reserved");
    });
        
  }

  // This function displays a message when there are no rentals
  function displayNoRentals() {
    browseDiv.empty();
    const messageH5 = $("<h5>");
    messageH5.css({ "margin-top": "25px" });
    messageH5.html(
      "No listings found, navigate <a href='/'>here</a> to visit homepage"
    );
    browseDiv.append(messageH5);
  }

  //Function to display rentals
  function displayRental(rentalData) {
    
    const rentalCard = $("<div>");
    rentalCard.addClass("col");

    const locationCol = rentalData.location;
    let imgSrc;

    //Switch statement to determine which photo to display based on location name
    switch(locationCol){
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
    }

    //Dynamically create card to display listing data
    rentalCard.html(
      `<div class="card" style="width: 18rem;">
                <img class="card-img-top" src=${imgSrc} alt="Card image cap">
                <div class="card-body">
                    <h5>${rentalData.property_name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><h6>Property type: ${rentalData.location}</h6>
                  </li>
                  <li class="list-group-item"><h6>Address:</h6>
                  <p>${rentalData.address}, ${rentalData.city}, ${rentalData.state}</p></li>
                  <li class="list-group-item"><h6>$${rentalData.price}/ Per day</h6>
                  </li>
                  <li class="list-group-item"><h6>Maximum ${rentalData.size_of_party} people per day</h6>
                  </li>
                  <li class="list-group-item"><h6>Bathrooms available: ${rentalData.facility}</h6>
                  </li>
                  <li class="list-group-item"><h6>Currently reserved: ${rentalData.reserved}</h6>
                  </li>
                </ul>
                <div class="card-body">
                <button type="button" data-id='${rentalData.id}' class="btn btn-outline-success reserve">Reserve this location</button>
                </div>
              </div>`

    );
    //Append card
    browseDiv.append(rentalCard);
  }

////////////////////////// Reserve rental function below /////////////////////////////////////

  

  ////////////////////////// Filter functions below /////////////////////////////////////
});