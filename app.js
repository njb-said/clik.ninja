AlertJS.setSetting("timeout", 3000);
$(document).ready(function() {
    $('noscript').fadeOut("slow", function() {
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
});

function timer(app) {
    if(app.time <= 0) {
        app.status = 2;
        AlertJS.Notify.Top.Info("Time Up!", "Your score: " + app.clicks, true);
        $('#timer').fadeOut();
    } else {
        setTimeout(function() {
            $('#timer').text(app.time);
            app.time--;
            timer(app);
        }, 1000);
    }
};

function updatePage(app) {
    $('#clicks').text(app.clicks);
};