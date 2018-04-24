$('a').on('click', function() {

   // PICK UP AND SAVE NAME ATTR TO KNOW WHICH FORM TO VALIDATE
	var name = $(event.target).attr("name");
   var whitelist = ['login', 'register', 'settings', 'date_request', 'date_cancel', 'accept', 'decline', 'comment', 'remove'];

   // TRIGGER IF NAME IS WITHIN WHITELIST
	if (jQuery.inArray(name, whitelist) != -1) {

      // SEND IN SOURCE VAR WHEN ACCEPTING/DECLINING REQUESTS
      if ($(event.target).attr("label") !== 'undefined') {
         var source = $(event.target).attr("label");
      }

		$.ajax({
         type: 'POST',
         url: '/core/js/tools.php',
         data: {id: name, source: source},
         success: function(data) {

            // PUSH IN CORRECT CONTENT FROM FORM CLASS
            $('#toolbox').html(data);

            // IF THERE IS A <SELECT> ELEMENT, PRINT IN ALL CURRENCIES AS OPTIONS
            if ($('#currency') !== undefined) {

               // FILL <SELECT> WITH CURRENCIES
               var headerList = ["<option>Your Local Currency</option>"];
               var object = JSON.parse(localStorage.getItem('CXR-headers'));

               $.each(object, function (short, long) {
                  headerList.push("<option>" + long + "</option>");
               });
               
               // CREATE NEEDED SELECT OPTIONS
               $("#currency").html(headerList.join(""));
            }

            // SHOW TABLE
            $("#tools").css('display', 'table');

            // NEEDED FOR VALIDATION TO WORK
            $.getScript("http://dating.proj/core/js/input.js");
         }
      });
   }
   
   // SORT PEOPLE TRIGGER
   if (name == 'sort') {

      // PICK UP ID
      var col = $(event.target).attr("id");

      $.ajax({
         type: 'POST',
         url: '/core/js/sort.php',
         data: {col: col},
         success: function(data) {

            // PUSH IN NEW TABLE
            $('#sorting').html(data);

            // REMOVE OLD UNDERLINES AND ADD IT TO TARGET
            $('#username, #zip, #income, #seeks').css('text-decoration', 'none');
            $('#' + col).css('text-decoration', 'underline');
         }
      });

   }

});

// HIDE WINDOW WHEN YOU PRESS ESC
jQuery(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
		var value = $("#tools").css('display');

		if (value == 'table') {
			$("#tools").css('display', 'none');
			$("#toolbox").html();
		}
    }
});

// UNDERLINE USERNAME LINK ON PEOPLE PAGE
$(document).ready(function() {
   $('#username').css('text-decoration', 'underline');
});