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
    alert("Successfully checked in the user.");
  })
  .fail( () => {
    alert("Something went wrong, request failed");
  })
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
      option.value = user.name;
      if (user.rfid != null) {
        option.text = "Checked In"
      }
      userList.append(option);
    });
  })
  .fail( () => {
    alert("failed to fetch data from server");
  });
}

reload()
