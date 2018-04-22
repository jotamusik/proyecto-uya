$(document).ready(function(){
    $('.parallax').parallax();
});

$(document).ready(function(){
    $('.sidenav').sidenav();
});


$('.activator').on('keypress' , function( event ) {

    let target = event.target;
    target.click();
    let card = target.closest('.card');
    let cardReveal = card.querySelector('.card-reveal');
    let cardTitle = cardReveal.querySelector('.card-title');
    cardTitle.focus();

});

$('.card-reveal').find('.card-title').on('keypress', function ( event ) {

    let target = event.target;
    target.click();
    let card = target.closest('.card');
    let cardContent = card.querySelector('.card-content');
    let cardTitle = cardContent.querySelector('.card-title');
    cardTitle.focus();

});

$(function(){

    $("#register").on('click', function(event){
        event.preventDefault();

        var name = $("#first_name").val();
        var lastName = $("#last_name").val();
        var email = $("#email").val();
        var password = $("#password").val();

        if(!name ||!lastName || !email || !password) {

            //$("#msgDiv").show().html("All fields are required.");
            console.log("Falta nombre, o apellido, o email o contraseña");

        }
        else{

            $.ajax({
                url: "/registro",
                method: "POST",

                data: { nombre: name, apellidos: lastName, email: email, password: password }

            }).done(function( data ) {

                if ( data ) {
                    if(data.status == 'error'){

                        console.log("Ha habido un error");

                       // var errors = '<ul>';
                       // $.each( data.message, function( key, value ) {
                       //     errors = errors +'<li>'+value.msg+'</li>';
                       // });

                       // errors = errors+ '</ul>';
                       // $("#msgDiv").html(errors).show();
                    }else{
                       // $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show();
                        console.log("Todo correcto con ajax");
                    }
                }
            });
        }
    });
});