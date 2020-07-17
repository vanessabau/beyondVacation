$(document).ready(function () {
    // Getting references to our form and inputs
    var listForm = $("form.list"); //checked
    var propertyInput = $("input#property-name");    // poster property name
    var rentalInput = $("select#list-selections"); //checked
    var addressInput = $("input#inputAddress"); //checked
    var cityInput = $("input#inputCity"); //checked
    var stateInput = $("select#inputState"); // checked
    var zipInput = $("input#inputZip"); //checked
    var priceInput = $("input#inputPrice"); //checked
    var partyInput = $("select#inputPartySize"); //checked
    var facilityInput = $("select#facility");

    function getUserInfo() {
        $.get("/api/user_data").then((data) => {
            console.log(data.id);
            return data.id;
        });
    };

    // When the form is submitted, we validate there's an name and location entered
    listForm.on("submit", function (event) {
        event.preventDefault();

        let userID = getUserInfo();

        var userData = { // <userdata is fine
            property: propertyInput.val().trim(),
            rental: rentalInput.val().trim(),
            address: addressInput.val().trim(),
            city: cityInput.val().trim(),
            state: stateInput.val().trim(),
            zip: zipInput.val().trim(),
            price: priceInput.val(),
            party: partyInput.val().trim(),
            facility: facilityInput.val().trim(),
            UserId: userID
        };

        console.log(userData);

        if (!userData.property || !userData.rental || !userData.address || !userData.city || !userData.state || !userData.zip || !userData.price || !userData.party || !userData.facility || !userData.UserId) {
            return;
        }

        // If we have an name and location we run the loginUser function and clear the form
        listUser(userData.property, userData.rental, userData.address, userData.city, userData.state, userData.zip, userData.price, userData.party, userData.facility, userData.UserId);
        propertyInput.val("");
        rentalInput.val("");
        addressInput.val("");
        cityInput.val("");
        stateInput.val("");
        zipInput.val("");
        priceInput.val("");
        partyInput.val("");
        facilityInput.val("");
    });




    // //price range
    // $('input').on('input', function () {

    //     if ((price !== '') && (price.indexOf('.') === -1)) {

    //         $(this).val(Math.max(Math.min(price, 3000), -0));
    //     }
    // });


    //post
    //ajax req then parse res
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function listUser(property, rental, address, city, state, zip, price, party, facility, userID) { // called on right side 
        $.post("/api/posts", { // left side is based on sequelize
            property_name: property,
            location: rental,
            address: address,
            city: city,
            state: state,
            zip: zip,
            price: price,
            size_of_party: party,
            facility: facility,
            UserId: userID
        })
            .then(function () {
                window.location.replace("/list"); //later for whichever html
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }

});

//put

