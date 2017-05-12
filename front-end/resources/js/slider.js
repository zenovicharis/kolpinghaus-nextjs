$(document).ready(function(){
    var item = $('#myCarousel .carousel-inner .item').first();
    $(item).addClass('active');
    var galleryItem = $('#article-photo-carousel .carousel-inner .item').first();
    $(galleryItem).addClass('active');
    var mealTypes = $('.mealsTypes');
    $(mealTypes).hide();
    var itemList = $('.itemList');
    $(itemList).hide();
    $('.mealsTypes[data-meal-id = "1"]').show();
    $('.itemList[data-meal-id = "1"]').show();
    $('.classes:visible').first().addClass('active-classes');
    $('.flasses:visible').first().addClass('active-classes');

    $('#map_canvas1').addClass('scrolloff'); // set the pointer events to none on doc ready
        $('#canvas1').on('click', function () {
            $('#map_canvas1').removeClass('scrolloff'); // set the pointer events true on click
        });

        // you want to disable pointer events when the mouse leave the canvas area;

        $("#map_canvas1").mouseleave(function () {
            $('#map_canvas1').addClass('scrolloff'); // set the pointer events to none when mouse leaves the map area
        });
});
function switchTypes(event){
    event.preventDefault();
    var target = $(event.target);
    if($(event.target).prop('tagName') == "A"){
        target = $(event.target).find('span');
    }
    $('.flasses').removeClass('active-classes');
    $(target).addClass('active-classes');

    var id = $(event.target).parent().attr('data-meal-type-id');
    $('.itemList').hide();
    $('.itemList[data-meal-type-id = "'+id+'"]').show();
}

function switchMeals(event){
    event.preventDefault();
    var target = $(event.target);
    
    if($(event.target).prop('tagName') == "A"){
        target = $(event.target).find('span');
    }
    $('.classes').removeClass('active-classes');
    $(target).addClass('active-classes');
    var id = $(target).parent().attr('data-meal-id');
    $('.mealsTypes').hide();

    $('.mealsTypes[data-meal-id = "'+id+'"]').show();
    $('.flasses:visible').first().addClass('active-classes');
    $('.itemList').hide();
    $('.itemList[data-meal-id = "'+id+'"]').show();
}
function addActive(e){
    $('.links').removeClass('ind-active');
    $(e.target).parent().addClass('ind-active');
}
$(document).ready(function() {  
    $("#myCarousel").swiperight(function() {  
        $("#myCarousel").carousel('prev');  
    });  
    $("#myCarousel").swipeleft(function() {  
        $("#myCarousel").carousel('next');  
    });  

    $("#article-photo-carousel").swiperight(function() {  
        $("#article-photo-carousel").carousel('prev');  
    });  
    $("#article-photo-carousel").swipeleft(function() {  
        $("#article-photo-carousel").carousel('next');  
    });  
});  
$('div.burger').on('click', function(){
    $('.hiddenList').toggleSlide();
});