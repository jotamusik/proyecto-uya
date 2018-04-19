$(document).ready(function(){
    $('.parallax').parallax();
});

$(document).ready(function(){
    $('.sidenav').sidenav();
});



// ToDo: Terminar de solucionar esto
$('.activator').on('keypress' , function() {
    console.log("HEY");
    this.click();
    var cardReveal = this.closest('.card-reveal');

});

