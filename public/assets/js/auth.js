$(document).ready(function() {

   // Send Registration data to Database
   $('#register').on('submit', function(event) {
$('.error-msg').text('Loading...')

      event.preventDefault();
      
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
               .trim(),
            password2: $('#password2')
               .val()
               .trim()
         };
         console.log(data);
   
         // Pass Data object to DB
         $.ajax({
            method: 'post',
            url: '/register',
            data: data
         })
         .then(function(res) {
            if (res.success){
               window.location.href= "/user-profile"
            }
         }).catch(function(err){
            console.log(err)
            if (err.responseJSON.type == "formError") {
               console.log('Form Error');
               $('.error-msg').text(err.responseJSON.errors[0].msg);
            }

            if (err.responseJSON.type == "dbError") {
               console.log('Database Error');
               if (err.responseJSON.error.original.code === 'ER_DUP_ENTRY') {
                  // duplicate email found
                  $('.error-msg').text('Email already exists. Please Login instead');
               } else {
                  $('.error-msg').text(err.responseJSON.msg);
               }
            }
         })
   }); // End of Registration

});
