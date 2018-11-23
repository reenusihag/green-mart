 var $form = $('#checkout-form');

$form.submit( function (event) {

    $form.find('button').prop('disabled', true);

    var address = {
        name:$('#c_name').val(),
        alternatenumber:$('#c_anumber').val(),
        address:$('#c_address').val(),
        paymentmethod:$('#c_paymethod').val()
    };

    $form.get(0).submit();

    return false;
} );