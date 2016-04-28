function deleter () {
  var rfid = $("#rfid")[0].value;
  if (rfid.length < 2) {
    alert("Provide an rfid");
    return;
  }
  $.ajax({
    url: "http://quantifiedselfbackend.local:6060/delete_processor/delete_data",
    type: "GET",
    data: {
      rfid: rfid
    }
  })
  .done( (data) => {
    $("#rfid").val("");
    inSuccess();
  })
  .fail( () => {
    alert("Something went wrong, request failed");
  })
}

function inSuccess() {
  $( ".confirm" ).fadeIn( 1000, function() {
    setTimeout(outSuccess, 4000);
  });
}

function outSuccess() {
  $(".confirm").fadeOut(1000);
}


