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


            $('.error-msg').text(err.responseJSON.msg)
         })
   }); // End of Registration

});
