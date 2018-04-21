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
