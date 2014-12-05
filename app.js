$(document).ready(function() {
    var window.click = {};
    click.status = 0;
    var validArea = $('.clickable');

    $(validArea).on('click', function() {
        if(click.status == 0) { // Waiting
            click.status = 1;
            click.clicks = 1;
        } else if(click.status == 1) { // Running
            click.clicks++;
            console.log("New result is " + click.clicks);
        }
    });
});