$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    //$("#email").text(data.email); figure out where in members hbs to grab
    $("#first-name").text(data.firstName);
    $("#last-name").text(data.lastName);
  });
});

//can we switch document with delete-reserve?
$(document).on("click", "button.delete", deleteList);
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