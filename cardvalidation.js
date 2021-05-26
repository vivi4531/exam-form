"use strict"; 

$('#cc_number').validateCreditCard(function(result) {
    if (result.valid) {
        $(this).addClass('cc-valid');
    } else {
        $(this).removeClass('cc-valid');
    }
});