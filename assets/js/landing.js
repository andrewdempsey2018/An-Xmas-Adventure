$(document).ready(function () {

    let width = $(window).width();
    console.log(width)
    var images = ['santa-run-left.png', 'santa-run-right.png'],
        index = 0, // starting index
        maxImages = images.length - 1;
    var timer = setInterval(function () {
        var currentImage = images[index];
        index = (index == maxImages) ? 0 : ++index;
        $('#sprite-animation').hide(0, function () {
            $('#sprite-animation').attr("src", 'assets/sprites/santa/' + currentImage);
            $('#sprite-animation').show(0);
            $("#sprite-animation").animate({left: "+=10"}, 0);
            console.log($('#sprite-animation').css("left").replace("px", ""), width)
            if($('#sprite-animation').css("left").replace("px", "")> (width-300) ){
                $('#sprite-animation').attr("src", 'assets/sprites/santa/santa-stand.png');
                clearInterval(timer);
        }});
    }, 200);


});