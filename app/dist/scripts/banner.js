
var banner = function () {
    if ($('.banner').length)
    {
        $('#banner' + banner_module).cycle({
            before: function (current, next) {
                $(next).parent().height($(next).outerHeight());
            }
        });
    }
}

$(document).ready(function () {
    setTimeout(banner, 2000);
});