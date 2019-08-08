$(document).ready(function() {

   // Send Registration data to Database
   $('#register').on('submit', function(event) {
      event.preventDefault();

      var password = $('#userPassword').val().trim();
      var password2 = $('#password2').val().trim();
      
      // Check if passwords Match
      if (password !== password2) {
         alert('Passwords do not match, please try again.');
      } else {
         // Write Data to Object
         var data = {
            firstName: $('#firstName')
               .val()
               .trim(),
            lastName: $('#lastName')
               .val()
               .trim(),
            email: $('#email')
               .val()
               .trim(),
            password: $('#userPassword')
               .val()
               .trim()
         };
         console.log(data);
   
         // Pass Data object to DB
         $.ajax({
            method: 'post',
            url: '/register',
            data: data
         });
         // .then(function() {
         //    location.reload();
         // });
      }
   }); // End of Registration

});
