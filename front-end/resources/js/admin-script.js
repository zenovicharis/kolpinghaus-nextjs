$(document).ready(function(){
    $('.cont').hide();
    $('div#one').show();
});

function switchPannels(e){
    e.preventDefault();
    $('.it').removeClass('active');
    var li = $(e.target).parent().addClass('active');
    var id = $(e.target).attr('data-id');
    $('.cont').hide();
    $('#'+id).show();
}
$('.upload').on('click',function(){
    var upload = $(this).next().next();
    $(upload).click();
})

$('.galleryUploader').on('change',function(){
    var names = [];
    var data = new FormData();
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        names.push($(this).get(0).files[i].name);
        data.append('pic-'+i, $(this).get(0).files[i]);
    }
    $('.uploadedSpan').text(names.join(', '));
    $.ajax({
        url: "/gallery/upload/",
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        images = data;
        createThumbs(data);
    });
});
