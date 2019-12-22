// hiding stuff that are by default shown
$(document).ready(function(){
    $('.cont').hide();
    $('div#one').show();
    $('.cancel').hide();
    $('.saveEdit').hide();
    $('.saveEditFood').hide();
    $('.cancelFood').hide();
});
//switching pannels between eachother
function switchPannels(e){
    e.preventDefault();
    $('.it').removeClass('active');
    var li = $(e.target).parent().addClass('active');
    var id = $(e.target).attr('data-id');
    $('.cont').hide();
    $('#'+id).show();
}

//trigering upload button
$('.upload').on('click',function(){
    var upload = $(this).next();
    $(upload).click();
})

//uploading picture after selecting which to upload
$('.galleryUploader').on('change',function(){
    var data = new FormData();
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        data.append('pic-'+i, $(this).get(0).files[i]);
    }
    $.ajax({
        url: "/gallery/upload/",
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        console.log(data);
        images = data;
        storeGalleryPics(data);
    });
});


//uploading picture from slider when it is checked
$('#uploadSlider').on('change',function(){
    var data = new FormData();
    data.append('pic',$(this).get(0).files[0]);
    $.ajax({
        url: "/slider/upload/",
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        storePicInPannel(data);
    });
});     

// storing html picture inside pannel for Gallery
function storePicInPannel(url){
    $('#urlName').val(url);
    var container = $('<div>', {'class':'col-sm-3 galleryPicContainer'})
    var img = $('<img>', {'class':'pic'});
    $(img).attr('src', url)
    var imgX = $('<img>', {'class' : 'closeX'});
    $(imgX).attr('src', '/front-end/resources/img/x.png')
    $(imgX).attr('data-url', url);
    $(container).append(img,imgX);
    $('.holder').append(container);
}

//saving inside gallery pannel
$('#save').on('click', function(e){
    var divs = $('.upload-pannel').children();
    $(divs).each(function(){
        $('.galleryPannel').append(this);
    })
    $('.upload-pannel').empty();
});

// storing picture and generating html
function storeGalleryPics(data){
    $(data).each(function(){
        var container = $('<div>', {'class':'col-sm-3 galleryPicContainer'})
        var img = $('<img>', {'class':'pic'});
        $(img).attr('src', this.url)
        var imgX = $('<img>', {'class' : 'closeX'});
        $(imgX).attr('src', '/front-end/resources/img/x.png')
        $(imgX).attr('data-id', this.id);
        $(container).append(img,imgX);
        $('.upload-pannel').append(container);
    })
}
//deleting picture from 
$(document).on('click','img.closeX',function(e){
    var id = $(this).attr('data-id');
    var self = this;
    $.post('/gallery/delete/'+id).done(function(data){
        if($(self).parent().parent().hasClass('upload-pannel')){
            var text = $('.uploadedSpan').text();
        }
        $(self).parent().hide();
        console.log('done');
    })
});

//create new slider picture
$('#saveSlider').on('click',function(){
    var data = new FormData();
    data.append('title',$('#title').val());
    data.append('about',$('#about').val());
    data.append('url',$('#urlName').val());
    $.ajax({
            url: "/slider/create/",
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(data){
            console.log(data);
            addNewRow(data);
        });
});

//adding new row for slide pannel
function addNewRow(slide){
    var row = $('<tr>');
    var cellOne   = $('<td>');
    var cellTwo   = $('<td>');
    $(cellTwo).text(slide.title);
    var cellThree = $('<td>');
    $(cellThree).text(slide.about);
    var cellFour  = $('<td>');
    var edit = $('<button>', {'class':'btn btn-primary edit'});
    $(edit).text('Bearbeiten');
    var del = $('<button>', {'class':'btn btn-danger delete'});
    $(del).text('Löschen');
    $(del).attr('data-id', slide.id);
    var cancel = $('<button>', {'class':'btn btn-default cancel'});
    $(cancel).text('Annullieren');
    var save = $('<button>', {'class':'btn btn-success saveEdit'});
    $(save).text('Speichern');
    $(save).hide();
    $(cancel).hide();
    var div = $('<div>', {'class' : 'col-sm-3'});
    var img = $('<img>', {'class':'pic'});
    $(img).attr('src', slide.url);
    $(div).append(img);
    $(cellOne).append(div);
    $(cellFour).append(edit,del,cancel,save);
    $(row).append(cellOne, cellTwo, cellThree, cellFour);
    $('table').append(row);
    $('.holder').empty();
    $('#title').val('');
    $('#about').val('');
}
//listening for delete putton event in slider
$(document).on('click', 'button.delete', function(e){
    $(e.target).parent().parent().hide();
    var id = $(e.target).attr('data-id');
    $.post('/slider/delete/'+id).done(function(data){
        console.log(data);
    })
});
//listening for edit button inside slider section
$(document).on('click', 'button.edit', function(e){
    var cell = $(e.target).parent();
    $(cell).find('button.cancel').show();
    $(cell).find('button.saveEdit').show();
    $(cell).find('button.delete').hide();
    $(cell).find('button.edit').hide();
    var cellTwo = $(cell).prev();
    var cellThree = $(cellTwo).prev();
    var cellTwoText = $(cellTwo).text();
    $(cellTwo).empty();
    var cellThreeText = $(cellThree).text();
    $(cellThree).empty();
    $('<input>').attr({
        type: 'text',
        id: 'titleRow',
        name: 'titleRow',
        value: cellThreeText.trim()
    }).appendTo(cellThree);
    $('<input>').attr({
        type: 'text',
        id: 'aboutRow',
        name: 'aboutRow',
        value: cellTwoText.trim()
    }).appendTo(cellTwo);

});
//listening for cancel button in slider section
$(document).on('click', 'button.cancel', function(e){
    var cell = $(e.target).parent();
    hideInputs(cell);

});

// function for removing input fields
function hideInputs(cell){
    $(cell).find(':hidden').show();
    $(cell).find('button.saveEdit').hide();
    $(cell).find('button.cancel').hide();
    var cellTwo = $(cell).prev();
    var cellThree = $(cellTwo).prev();
    var cellTwoText = $(cellTwo).find('input').val();
    $(cellTwo).empty();
    $(cellTwo).text(cellTwoText);
    var cellThreeText = $(cellThree).find('input').val();;
    $(cellThree).empty();
    $(cellThree).text(cellThreeText);
}

//listening for save after edit button inside slider section
$(document).on('click', 'button.saveEdit', function(e){
    var cell = $(e.target).parent();
    var about = $(cell).prev().find('input').val();
    var title = $(cell).prev().prev().find('input').val();
    var id = $(this).attr('data-id');
    var data = new FormData();
    data.append('title', title);
    data.append('about',about);
    $.ajax({
        url: "/slider/update/"+ id,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        hideInputs(cell);
    });
});
//listening for edit buton inside menu section
$(document).on('click','button.editFood',function(e){
    var cell = $(e.target).parent();
    revailInputsFood(cell);
});
//function for setting the input fields inside menu section
function revailInputsFood(cell){
    var row = $(cell).parent();
    var children = $(row).children();
    $(children).each(function(i){
        if(i < 3){
            var text = $(this).text();
            $(this).empty();
            $('<input>').attr({
                type: 'text',
                value: text.trim()
            }).appendTo(this);
        }
    })
    $(cell).find(':hidden').show();
    $(cell).find('.deleteFood').hide();
    $(cell).find('.editFood').hide();
}
//listening for edit button inside menu section
$(document).on('click','button.saveEditFood', function(e){
    var cell = $(e.target).parent();
    var id = $(e.target).attr('data-id');
    sendEditedFoodRow(cell,id);
    hideInputsFood(cell);
});
// listening for cancel button inside menu section 
$(document).on('click','button.cancelFood', function(e){
    var cell = $(e.target).parent();
    hideInputsFood(cell);
});
//function for hiding input fi
function hideInputsFood(cell){
    var row = $(cell).parent();
    var children = $(row).children();
    $(children).each(function(i){
        if(i < 3){
            var text = $(this).find('input').val();
            $(this).empty();
            $(this).text(text); 
        }
    });
    $(cell).find(':hidden').show();
    $(cell).find('.saveEditFood').hide();
    $(cell).find('.cancelFood').hide();
}
// creating new recipe for menu
$('.saveNewFood').on('click', function(e){
    var name = $('#nameFood').val();
    $('#nameFood').val('');
    var info = $('#infoFood').val();
    $('#infoFood').val('');
    var price = $('#priceFood').val();
    $('#priceFood').val('');
    var mealTypeId = $('#mealType').val();
    var data = new FormData();
    data.append('name', name);
    data.append('info', info);
    data.append('price', price);
    data.append('meal_type_id', mealTypeId);
    $.ajax({      
        url: "/food/create/",
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        addFoodToTable(data);
    });
}); 
// setting new food and generating html
function addFoodToTable(food){
    var table = $('table[data-type-id="'+food.meal_type_id+'"]');
    var row = $('<tr>');
    var td = $('<td>').text(food.name);
    var tdTwo = $('<td>').text(food.info);
    var tdThree = $('<td>').text(food.price);
    var tdFour = $('<td>');
    $('<button>',{
        'class': 'btn btn-default saveEditFood',
        'data-id' : food.id,
        'text': 'Save'
    }).appendTo(tdFour).hide();
    $('<button>',{
        'class': 'btn btn-default cancelFood',
        'data-id' : food.id,
        'text' : "Cancel"
    }).appendTo(tdFour).hide();
    $('<button>',{
        'class': 'btn btn-default editFood',
        'data-id' : food.id,
        'text': 'Edit'
    }).appendTo(tdFour);
    $('<button>',{
        'class': 'btn btn-default deleteFood',
        'data-id' : food.id,
        'text': 'Delete'
    }).appendTo(tdFour);
    $(row).append(td,tdTwo,tdThree,tdFour);
    $(table).append(row);
}

// edit rows for menu section
function sendEditedFoodRow(cell, id){
    var row = $(cell).parent();
    var cells = $(row).children();
    var values = [];
    $(cells).each(function(i){
        if(i < 3){
            values.push($(this).find('input').val());
        }
    });
    var data = new FormData();
    data.append('name',values[0]);
    data.append('info',values[1]);
    data.append('price',values[2]);
    $.ajax({
        url: "/food/edit/"+id,
        type: 'POST',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function(data){
        console.log(data);
    });
}
// listening for event in menu section
$(document).on('click', 'button.deleteFood',function(e){
    var id = $(this).attr('data-id');
    $.post('/food/delete/'+id).done(function(data){
        console.log(data);
    });
    $(e.target).parent().parent().hide();
});

