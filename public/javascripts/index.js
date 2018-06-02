

let isMobile = {
    Android: () => {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: () => {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: () => {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: () => {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: () => {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: () => {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }

};

// En caso de ser movil, quitar containers y poner titulo a la derecha
function checkIsMobile() {
    if (isMobile.any()) {
        $('nav .container').removeClass('container');
        $('.paralax-container').addClass('myParallax-container');
    }
}

function isMailValid(myEmail) {

    let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    let isValid = regEx.test(myEmail);
    console.log("El correo es valido: " + myEmail + " -> " + isValid);
    return isValid;
}

function isPasswordValid(myPassword) {

    let regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    let isValid = regEx.test(myPassword);

    console.log("La contraseña es valida: " + myPassword + " -> " + isValid);
    return isValid;
}

checkIsMobile();

$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('.sidenav').sidenav();
});

// Cards Accesibles
$('.activator').on('keypress', function (event) {

    let target = event.target;
    target.click();
    let card = target.closest('.card');
    let cardReveal = card.querySelector('.card-reveal');
    let cardTitle = cardReveal.querySelector('.card-title');
    cardTitle.focus();

});

$('.card-reveal').find('.card-title').on('keypress', function (event) {

    let target = event.target;
    target.click();
    let card = target.closest('.card');
    let cardContent = card.querySelector('.card-content');
    let cardTitle = cardContent.querySelector('.card-title');
    cardTitle.focus();

});

// Mensajes de error exito o error en el formulario de registro
$(function () {

    $("#register").on('click keypress', function (event) {
        event.preventDefault();

        let name = $("#first_name").val();
        let lastName = $("#last_name").val();
        let email = $("#email").val();
        let password = $("#password").val();

        let errorMessage = $("#errorMessage");

        if (!name || !lastName || !email || !password) {

            errorMessage.show();
            errorMessage.html("Faltan campos por rellenar");

        }
        else {

            if (isMailValid(email) && isPasswordValid(password)) {

                $.ajax({
                    url: "/registro",
                    method: "POST",
                    dataType: 'json',

                    data: {
                        nombre: name,
                        apellidos: lastName,
                        email: email,
                        password: password
                    }

                }).done(function (data) {

                    if (data) {

                        if (data.status == 'error') {

                            errorMessage.toggleClass("red-text text-accent-4");
                            errorMessage.show();
                            errorMessage.html("Ha habido un problema con el registro. Verifique que los datos " +
                                "introducidos son correctos o inténtelo más tarde");

                        }
                        else {

                            location.href = '/register-successful'
                        }
                    }
                });
            }
            else {
                errorMessage.show();
                errorMessage.html("Compruebe que el correo y la contraseña son válidos. La contraseña debe " +
                    "ser mínimo de 8 caracteres y combinar mayúsculas, minúsculas y números");
            }
        }
    });
});

// Mensaje de exito o error en el formulario de inicio de sesion
$(function () {

    $("#login").on('click keypress', function (event) {
        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();

        let errorMessage = $("#errorMessage");

        if ( !email || !password) {

            errorMessage.show();
            errorMessage.html("Faltan campos por rellenar");

        }
        else {

            if (isMailValid(email) && isPasswordValid(password)) {

                $.ajax({
                    url: "/login",
                    method: "POST",
                    dataType: 'json',

                    data: {
                        email: email,
                        password: password
                    }

                }).done(function (data) {

                    if (data) {

                        if (data.status == 'error') {

                            errorMessage.show();
                            errorMessage.html("Correo o contraseña inválidos, compruebe los datos introducidos.");

                        }
                        else {

                            //location.href = '/login-successful';
                            $.redirect('/myUser', { email: email, password: password });


                        }
                    }
                });
            }
            else {
                errorMessage.show();
                errorMessage.html("Correo o contraseña inválidos, compruebe los datos introducidos.");
            }
        }
    });
});

//Barra Lateral Accesible
$('.sidenav-trigger').on('keypress', function (event) {
    let target = event.target;
    target.click();
    // ToDo: Ïntentar dar el foco al primer enlace de la lista
    $('#homeButton').focus();
});

//SideNav Close
$(function () {
    $("#exitSideNav").on('click keypress', function (event) {
        $('.sidenav-overlay').click();
        $('#sideNavButton').focus();
    });
});

// Mensaje de error en el caso del formulario de contacto
$(function () {

    $("#contact").on('click keypress', function (event) {
        event.preventDefault();


        let name = $("#name").val();
        let contactEmail = $("#contactEmail").val();
        let asunto = $("#asunto").val();
        let message = $("#message").val();

        let errorMessage = $("#errorMessage");

        if ( !name || !contactEmail || !asunto || !message) {

            errorMessage.show();
            errorMessage.html("Faltan campos por rellenar.<br>");

            if ( !name ) {
                errorMessage.show();
                errorMessage.html(errorMessage.html() + "Es necesario introducir el nombre completo.<br>");
            }

            if ( !contactEmail ) {
                errorMessage.show();
                errorMessage.html(errorMessage.html() + "Es necesario introducir el email de contacto.<br>");
            }

            if ( !asunto ) {
                errorMessage.show();
                errorMessage.html(errorMessage.html() + "Es necesario introducir el asunto.<br>");
            }

            if ( !message ) {
                errorMessage.show();
                errorMessage.html(errorMessage.html() + "Es necesario introducir el mensaje.<br>");
            }

        }
        else {

            if (isMailValid(contactEmail)) {

                $('#contactForm').submit()
            }
            else {
                errorMessage.show();
                errorMessage.html("Correo inválido, compruebe los datos introducidos.");
            }
        }
    });
});
