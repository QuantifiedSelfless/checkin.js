$.ajax({
  url: "http://quantifiedselfbackend.local:7070/api/showtimes",
    type: "GET"
})
.done( (data, textStatus) => {
  if (data.status_code != 200) {
    console.error("Didn't get a 200 OK from server; ignoring the result.");
    return;
  }

  data.data.forEach( (showtime) => {
    var option = document.createElement("option");
    option.value = showtime.id;
    option.text = showtime.date;
    $("#showtime_list")[0].add(option)
  });
})
.fail( () => {
  console.error("HTTP Request Failed");
})

function unlockShow () {
  var show_id = $("#showtime_list")[0].value;
  if (show_id.length < 2) {
    alert("Pick a show first")
    return;
  }
  
  var url_params = "?showtime_id=" + show_id;
  var inputs = $(".share_secret");
  // change to share
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if(input.value.length > 2) {
      url_params += "&passphrase=" + input.value
    }
  }

  $.ajax({
    url: "http://quantifiedselfbackend.local:6060/api/showtime/unlock" + url_params,
    type: "GET"
  })
  .done( (data, textStatus) => {
    window.location = "checkin.html";
  })
  .fail( (error) => {
    alert("ERROR: " + error);
  })
}
