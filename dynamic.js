$(function(){
    var num=0;
    $('#next').prop("disabled",true);
    $("#previous").prop("disabled",true);
    var imageLinks = [];

    function start(){
        $("#display .image").remove();
        let s=num, e=num+20;
        if(s-20>=0){
            $("#previous").prop("disabled", false);
        }else{
            $("#previous").prop("disabled", true);
        }
        if(imageLinks.length-e>=0){
                $("#next").prop("disabled", false);
            }else{
                $("#next").prop("disabled", true);
            }
        for(let i=s; i<e && i<imageLinks.length; i++){
            $('#display').append(`<div class="image"><img src="${imageLinks[i]}" alt=""></div>`);
        }
    }
    function fillLinks(data){
        var imageArr = data.photos;
        for(let i=0; i<imageArr.length; i++){
            // console.log(imageArr[i].img_src);
            imageLinks.push(imageArr[i].img_src);

        }
        start();
    }

    $("#getImage").click(function(){
        $.ajax({
            url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
            method: 'get',
            data: {
                api_key: 'DEMO_KEY',
                earth_date: $('#earthDate').val()
            },
            success: fillLinks
        });
    });
    function callNext(){
        num +=20;
        start();
    }
    function callPrevious(){
        num -= 20;
        start();
    }
    $('#next').click(callNext);
    $('#previous').click(callPrevious);
});
