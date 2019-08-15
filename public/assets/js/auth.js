$(document).ready(function() {
  //* Send Registration data to Database
  $("#register").on("submit", function(event) {
    $(".error-msg").text("Loading...");

    event.preventDefault();

    // Write Data to Object
    var data = {
      firstName: $("#firstName")
        .val()
        .trim(),
      lastName: $("#lastName")
        .val()
        .trim(),
      email: $("#email")
        .val()
        .trim(),
      password: $("#userPassword")
        .val()
        .trim(),
      password2: $("#password2")
        .val()
        .trim()
    };
    console.log(data);

    // Pass Data object to DB
    $.ajax({
      method: "post",
      url: "/register",
      data: data
    })
      .then(function(res) {
        if (res.success) {
          window.location.href = "/login";
        }
      })
      .catch(function(err) {
        console.log(err);

        // Check if Form error
        if (err.responseJSON.type === "formError") {
          console.log("Form Error");
          $(".error-msg").text(err.responseJSON.formErrors[0].msg);
        }

        // Check if DB error
        if (err.responseJSON.type === "dbError") {
          console.log("Database Error");

          // Check for duplicate email found
          if (err.responseJSON.error.original.code === "ER_DUP_ENTRY") {
            $(".error-msg").text("Email already exists. Please Login instead");
          } else {
            // Generic error
            $(".error-msg").text(err.responseJSON.msg);
          }
        }
      });
  }); // End of Registration function

  //* Send Registration data to Database
  $("#login").on("submit", function(event) {
    $(".error-msg").text("Loading...");

    event.preventDefault();

    // Write Data to Object
    var data = {
      email: $("#email")
        .val()
        .trim(),
      password: $("#userPassword")
        .val()
        .trim()
    };
    console.log(data);

    // Pass Data object to DB
    $.ajax({
      method: "post",
      url: "/login",
      data: data
    })
      .then(function(res) {
        console.log("then: ", res);
        if (res.success) {
          window.location.href = "/user-profile";
        }
      })
      .catch(function(err) {
        console.log("error: ", err);

        if (err.responseText === "Unauthorized") {
          console.log("Login Error");
          $(".error-msg").text(
            "Your email or password are incorrect. Please try again"
          );
        }
      });
  }); // End of Login function
});
