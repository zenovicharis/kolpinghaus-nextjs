// $('a[href^="#"]').on('click', function(event) {

//     var target = $(this.getAttribute('href'));

//     if( target.length ) {
//         event.preventDefault();
//         $('html, body').stop().animate({
//             scrollTop: target.offset().top
//         }, 2000);
//     }
// });
// $(window).on('scroll', function() {
//           var currentPos = $(document).scrollTop();
//            var heightOne = $("#container").offset().top;
//            var heightTwo = $("#restourantContainer").offset().top;
//            var heightThere = $("#speiseCarte").offset().top;
//            var heightFour = $("#Contact").offset().top;
//            var boxes = $(".menuBlock");
//            if(currentPos > 0 & currentPos < (heightTwo - 100)){
//              $(boxes).each(function() {
//                 if($(this).hasClass("yella")){
//                   $(this).removeClass("yella");
//                 }
//              });
//              $(boxes[0]).addClass("yella");
//            }
//            else if(currentPos < (heightThere - 100) & currentPos >= (heightTwo - 100)){
//              $(boxes).each(function() {
//                 if($(this).hasClass("yella")){
//                   $(this).removeClass("yella");
//                 }
//              });
//              $(boxes[1]).addClass("yella");
//            }
//            else if(currentPos <  (heightFour - 100 )& currentPos >= (heightThere -100) ){
//              $(boxes).each(function() {
//                 if($(this).hasClass("yella")){
//                   $(this).removeClass("yella");
//                 }
//              });
//              $(boxes[2]).addClass("yella");
//            }
//            else if(currentPos >= (heightFour - 100) ){
//              $(boxes).each(function() {
//                 if($(this).hasClass("yella")){
//                   $(this).removeClass("yella");
//                 }
//              });
//              $(boxes[3]).addClass("yella");
//            }
//            });
