$(document).ready(() => {
  // Getting references to our form and input
  const firstName = $("input#firstName-input"); //checked
  const lastName = $("input#lastName-input"); //checked
  const signUpForm = $("form#signup"); //checked
  const emailInput = $("input#email-input"); //checked
  const passwordInput = $("input#password-confirm"); //checked

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    console.log("click");
    event.preventDefault();
    const userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    //If there are empty field return
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password
    );
    firstName.val(""), lastName.val(""), emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/login");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
