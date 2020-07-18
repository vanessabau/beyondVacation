$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});


function deleteList() {

  console.log("test")
  const dataId = $(this).attr("data-id");

  console.log(dataId);
  const dataObject = {};

  dataObject.id = dataId

  $.ajax({
    url: '/api/posts',
    type: 'DELETE',
    data: dataObject,

  }).then(function () {
    console.log("success");
  })
  //put content here, for now console.log
  console.log("Rental Reserved");
};