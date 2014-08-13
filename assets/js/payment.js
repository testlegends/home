/**
 * Payment Handler
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/08/11
 */

$(document).ready(function(){
    $('#receipt').hide();

    $('#submitBtn').click(function () {
        $(this).prop('disabled', true);

        var ccNum = $('input.ccjs-number').val(),
            cvcNum = $('input.ccjs-csc').val(),
            expMonth = parseInt($('select.ccjs-month').val()),
            expYear = parseInt($('select.ccjs-year').val()),
            error = false;

        if (!validator.isEmail($('input[name=email]').val())) {
            error = true;
            toastr.error('E-mail appears to be invalid.');
        } else if (tripe.validateCardNumber(ccNum)) {
			error = true;
			toastr.error('The credit card number appears to be invalid.');
		} else if (!Stripe.validateCVC(cvcNum)) {
			error = true;
			toastr.error('The CVC number appears to be invalid.');
		} else if (!Stripe.validateExpiry(expMonth, expYear)) {
			error = true;
			toastr.error('The expiration date appears to be invalid.');
		} else if ($('input[name=name]').val().length === 0) {
            error = true;
            toastr.error('Name can not be empty.');
        }

        if (!error) {
			Stripe.createToken({
				number: ccNum,
				cvc: cvcNum,
				exp_month: expMonth,
				exp_year: expYear
			}, stripeResponseHandler);
		} else {
            $(this).prop('disabled', false);
        }
    });
});

function stripeResponseHandler (status, response) {
    if (response.error) {
        toastr.error(response.error.message);
    } else {
        $.ajax({
            url: '/payment',
            type: 'POST',
            data: {
                stripeToken: response.id,
                email: $('input[name=email]').val(),
                name: $('input[name=name]').val(),
                cardType: $('select[name=cardType]').val()
            }
        }).done(function (response) {
            if (response.status === 'OK') {
                $('#payment-form').fadeOut('fast', function(){
                    $('#receipt').fadeIn();
                });
                toastr.success('Payment Successful!');
            } else {
                toastr.error('Error processing the payment.');
            }
        });
    }
}
