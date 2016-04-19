jQuery.ajax({
    url: "https://iamadatapoint.com/api/showtimes",
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
