$(document).ready(() => {

    //browseDiv to hold all rental cards
    var browseDiv = $("#browse-rentals");

    //variable to hold data from database
    var rentalData;

    //Click event for the reserve button
    $(document).on("click", "button.reserve", reserveRental);

    //Get request to retrieve data from Posts table and display cards
    $.get("/api/posts").then(data => {
        console.log("rentals", data);
        rentalData = data;
        console.log("listingData:", rentalData);
        if(!rentalData || !rentalData.length){
            displayNoRentals();
        }else{
        for (i=0; i<rentalData.length; i++){
            displayRental();
        }
    }
    });

    //Reserve rental function updates status in database to "reserved" when button is clicked
    function reserveRental() {
        //put content here, for now console.log
        console.log("Rental Reserved");
    };

    // This function displays a message when there are no rentals
    function displayNoRentals() {
        browseDiv.empty();
        var messageH5 = $("<h5>");
        messageH5.css({ "margin-top": "25px" });
        messageH5.html("No listings found, navigate <a href='/'>here</a> to visit homepage");
        browseDiv.append(messageH5);
    };

    //Function to display rentals
    function displayRental(){
        var rentalCard = $("<div>");
        rentalCard.addClass("col");
        rentalCard.html(
            `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="https://www.familyhandyman.com/wp-content/uploads/2018/02/handcrafted-log-home.jpg" alt="Card image cap">
            <div class="card-body">

              <h5 class="card-title">${rentalData[i].property_name}</h5>

            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><h6>Property type: ${rentalData[i].location}</h6>
              </li>
              <li class="list-group-item"><h6>Address:</h6>
              <p>${rentalData[i].address}, ${rentalData[i].city}, ${rentalData[i].state}</p></li>
              <li class="list-group-item"><h6>$${rentalData[i].price}/ Per day</h6>
              </li>
              <li class="list-group-item"><h6>Maximum ${rentalData[i].size_of_party} people per day</h6>
              </li>
              <li class="list-group-item"><h6>Bathrooms available: ${rentalData[i].facility}</h6>
              </li>
              <li class="list-group-item"><h6>Currently reserved: ${rentalData[i].reserved}</h6>
              </li>
            </ul>
            <div class="card-body">
            <button type="button" class="btn btn-outline-success reserve">Reserve this location</button>
            </div>
          </div>`
        );
        browseDiv.append(rentalCard);
    };

});