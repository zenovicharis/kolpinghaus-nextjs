$(document).on('click','button.send span', function(){
    var data = new FormData();
    data.append('name', $('#name').val());
    data.append('mail', $('#mail').val());
    data.append('content', $('.content-mail').val());
    $('#name').val("");
    $('#mail').val("");
    $('.content-mail').val("");
    $.ajax({
        url: "/mail",
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        console.log(data);
    });
});

