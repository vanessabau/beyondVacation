$(document).ready(() => {
  // Getting references to our form and inputs
  const listForm = $("form.list");
  const propertyInput = $("input#property-name");
  const rentalInput = $("select#list-selections");
  const addressInput = $("input#inputAddress");
  const cityInput = $("input#inputCity");
  const stateInput = $("select#inputState");
  const zipInput = $("input#inputZip");
  const priceInput = $("input#inputPrice");
  const partyInput = $("select#inputPartySize");
  const facilityInput = $("select#facility");

  // When the form is submitted, we validate there's an name and location entered
  listForm.on("submit", event => {
    event.preventDefault();

    const userData = {
      property: propertyInput.val().trim(),
      rental: rentalInput.val().trim(),
      address: addressInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zip: zipInput.val().trim(),
      price: priceInput.val(),
      party: partyInput.val().trim(),
      facility: facilityInput.val().trim()
    };

    if (
      !userData.property ||
      !userData.rental ||
      !userData.address ||
      !userData.city ||
      !userData.state ||
      !userData.zip ||
      !userData.price ||
      !userData.party ||
      !userData.facility
    ) {
      return;
    }

    // If we have an name and location we run the loginUser function and clear the form
    listUser(
      userData.property,
      userData.rental,
      userData.address,
      userData.city,
      userData.state,
      userData.zip,
      userData.price,
      userData.party,
      userData.facility
    );
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

  function listUser(
    property,
    rental,
    address,
    city,
    state,
    zip,
    price,
    party,
    facility
  ) {
    //Get request to gather user data, post request to send user input and id to the Posters table
    $.get("/api/user_data").then(data => {
      $.post("/api/posts", {
        // left side is based on sequelize
        property_name: property,
        location: rental,
        address: address,
        city: city,
        state: state,
        zip: zip,
        price: price,
        size_of_party: party,
        facility: facility,
        UserId: data.id
      })
        .then(() => {
          window.location.replace("/list"); //later for whichever html
          // If there's an error, log the error
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
});
