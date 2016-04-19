var usermap = {};

function associate () {
  var username = $("#userinput")[0].value;
  var userid = usermap[username];
  if (!userid) {
    alert("Select a user");
    return;
  }
  var rfid = $("#rfid")[0].value;
  if (rfid.length < 2) {
    alert("Provide an rfid");
    return;
  }
  $.ajax({
    url: "http://quantifiedselfbackend.local:6060/api/user/associate",
    type: "GET",
    data: {
      userid: userid,
      rfid: rfid
    }
  })
  .done( (data) => {
    $("#rfid").val("");
    $("#userinput").val("");
    reload();
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



function reload () {
  $.ajax({
    url: "http://quantifiedselfbackend.local:6060/api/users/unlocked",
    type: "GET"
  })
  .done( (data) => {
    var userList = $("#users");
    usermap = {};
    userList.empty();
    data.data.forEach( (user) => {
      usermap[user.name] = user.id;
      var option = document.createElement("option");
      option.value = user.name
      option.text = user.email;
      if (user.rfid != null) {
        option.text = user.email + " Checked In"
      }
      userList.append(option);
    });
  })
  .fail( () => {
    alert("failed to fetch data from server");
  });
}

reload()
