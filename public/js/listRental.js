$(document).ready(() => {
  // Getting references to our form and inputs
  const listForm = $("form.list"); //checked
  const propertyInput = $("input#property-name"); // poster property name
  const rentalInput = $("select#list-selections"); //checked
  const addressInput = $("input#inputAddress"); //checked
  const cityInput = $("input#inputCity"); //checked
  const stateInput = $("select#inputState"); // checked
  const zipInput = $("input#inputZip"); //checked
  const priceInput = $("input#inputPrice"); //checked
  const partyInput = $("select#inputPartySize"); //checked
  const facilityInput = $("select#facility");

  // When the form is submitted, we validate there's an name and location entered
  listForm.on("submit", event => {
    event.preventDefault();

    const userData = {
      // <userdata is fine
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

    console.log(userData);

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

  // //price range
  // $('input').on('input', function () {

  //     if ((price !== '') && (price.indexOf('.') === -1)) {

  //         $(this).val(Math.max(Math.min(price, 3000), -0));
  //     }
  // });

  //post
  //ajax req then parse res
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
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
    // called on right side
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

//put
