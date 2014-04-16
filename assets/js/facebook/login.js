$(document).ready(function(){
	OAuth.initialize('ueT-FhebBFGfn4NJCs_Bt7wkDdc');

	$('#fb-login').click(function(){
		OAuth.popup('facebook', function(error, success){
			success.get('/me').done(function(data){
				$.ajax({
					url: '/user/fbLogin',
					type: 'POST',
					data: data,
					dataType: 'json'
				}).done(function (response) {
					if (response.status === "OK") {
						window.location.href = response.url;
					}
				}).fail(function(){

				});
			});
		});
	});
});