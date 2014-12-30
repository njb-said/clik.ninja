$(document).ready(function(){if($("[rel=tooltip]").length){$("[rel=tooltip]").tooltip();}$("body").hide().show();});


AlertJS.setSetting("timeout", 3000);
$(document).ready(function() {
    $('noscript').fadeOut("slow", function() {
        $('div.attempt').show();
        $('.content').fadeIn();
    });

    var click = {};
    click.status = 0;
    click.clicks = 0;
    click.time = 15;

    $(document).on('click', function() {
        if(click.status == 0) { // Waiting
            timer(click);
            click.status = 1;
            click.clicks = 1;
            AlertJS.Notify.Top.Info("Get Clicking!", "You have 15 seconds to clicks as many times as you can!", true);
        } else if(click.status == 1 && click.status > 0) { // Running
            click.clicks++;
        }
        updatePage(click);
    });

    $('.save-score').on('click', function() {
        if(!$('.save-score').prop('disabled')) {
            $('.save-score').attr('disabled', 'disabled');
            saveScore(click.clicks, $('input[name=username]').val());
            console.log("Detected a click..");
        }
    });
});

function timer(app) {
    if(app.time == 15) {
        $('#timer-wrapper').fadeIn();
        $('#timer').text(app.time);
    }
    if(app.time <= 0) {
        app.status = 2;
        AlertJS.Notify.Top.Info("Time Up!", "Your score: " + app.clicks, true);
        $('div.attempt').fadeOut('slow', function() {
            $('input[name=score]').val(app.clicks);
            $('div.submit').fadeIn();
            $('body').animate({backgroundColor: '#57B5CA'}, 'slow');
            $('div.attempt').remove();
        });
    } else {
        setTimeout(function() {
            $('#timer').text(app.time);
            app.time--;
            timer(app);
        }, 1000);
    }
};

function saveScore(score, name) {
    $.ajax({
        url: "http://api.clik.ninja/scoresave",
        type: "post",
        timeout: 5000,
        data: {
            name: name,
            score: score,
            client: navigator.userAgent
        },
        success: function(data) {
            if(data.status == 200) {
                // Successful
                console.log("INFO >> " + data.message);
                // Would fade out and show leaderboard.
            } else if(data.status == 400) {
                // Bad Request
                $('.save-score').removeAttr('disabled');
                console.log("ERROR >> " + data.message);
            } else {
                // Error on server
                $('.save-score').removeAttr('disabled');
                console.log("SEVERE >> " + data.message);
                AlertJS.Notify.Top.Error("Uh oh!", 'We were unable to save your score due to a technical error, sorry about that.');
            }
        },
        error: function(xhr, opt, err) {
            $('.save-score').removeAttr('disabled');
            console.log("SEVERE >> " + err);
            AlertJS.Notify.Top.Error("Uh oh!", 'We were unable to save your score due to a technical error, sorry about that.');
        }
    });
};

function updatePage(app) {
    $('#clicks').text(app.clicks);
};
