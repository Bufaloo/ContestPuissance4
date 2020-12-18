$('#game').ready(function(){

    const p4 = new P4('#game');
    $('#restart').on('click',function(){
        $('#game').empty();
        p4.plateau();
        p4.points();
        $('#restart').css('visibility','hidden');

    })

    
});

