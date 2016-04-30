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
    inSuccess();
    reload();

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
  $('#mytable').remove();
  createTable();
  $.ajax({
    url: "http://quantifiedselfbackend.local:6060/api/users/unlocked",
    type: "GET"
  })
  .done( (data) => {
    var userList = $("#users");
    usermap = {};
    userList.empty();
    data.data.forEach( (user) => {
      var rfid = user.rfid;
      var email = user.email;
      var name = user.name;
      var uid = user.id;
      var count = 0;
      Object.keys(user.permissions).forEach(function(key) {
        if(user.permissions[key] == true){
          count++;
        }
      });
      var elem = "<tr>\
        <td>"+name+"</td>\
        <td>"+email+"</td>\
        <td>"+count+"</td>\
        <td>"+rfid+"</td>\
        <td>"+uid+"</td>\
      </tr>";
      $('#mytable').append(elem);
      usermap[user.name] = user.id;
      var option = document.createElement("option");
      option.value = user.name
      option.text = user.email + " - " + count;
      if (user.rfid != null) {
        option.text = user.email + " - " + count + " - Checked In"
      } 
      userList.append(option);
    });
  })
  .fail( () => {
    alert("failed to fetch data from server");
  });
}

function createTable () {
  table ="<table id='mytable'>\
  <tr>\
    <th>Name</th>\
    <th>Email</th>\
    <th>Companions</th>\
    <th>RFID</th>\
    <th>UserID</th>\
  </tr>";

  $('#user-table').append(table);

}

reload();
