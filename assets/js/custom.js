/* TOOLTIP */
$(function () {
    var targets = $('[rel~=tooltip]')
        , target = false
        , tooltip = false
        , title = false;
    targets.bind('mouseenter', function () {
        target = $(this);
        tip = target.attr('title');
        tooltip = $('<div id="tooltip"></div>');
        if (!tip || tip == '') return false;
        target.removeAttr('title');
        tooltip.css('opacity', 0).html(tip).appendTo('body');
        var init_tooltip = function () {
            if ($(window).width() < tooltip.outerWidth() * 1.5) tooltip.css('max-width', $(window).width() / 2);
            else tooltip.css('max-width', 340);
            var pos_left = target.offset().left + (target.outerWidth() / 2) - (tooltip.outerWidth() / 2)
                , pos_top = target.offset().top - tooltip.outerHeight() - 20;
            if (pos_left < 0) {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass('left');
            }
            else tooltip.removeClass('left');
            if (pos_left + tooltip.outerWidth() > $(window).width()) {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass('right');
            }
            else tooltip.removeClass('right');
            if (pos_top < 0) {
                var pos_top = target.offset().top + target.outerHeight();
                tooltip.addClass('top');
            }
            else tooltip.removeClass('top');
            tooltip.css({
                left: pos_left
                , top: pos_top
            }).animate({
                top: '+=10'
                , opacity: 1
            }, 50);
        };
        init_tooltip();
        $(window).resize(init_tooltip);
        var remove_tooltip = function () {
            tooltip.animate({
                top: '-=10'
                , opacity: 0
            }, 50, function () {
                $(this).remove();
            });
            target.attr('title', tip);
        };
        target.bind('mouseleave', remove_tooltip);
        tooltip.bind('click', remove_tooltip);
    });
});


/*LİST VERTİCAL EVENT WİDTH*/
$(window).resize(function() {
  $('#ge-calendar-cell-div .list-vertical li a').width($('#ge-calendar-cell-div td').width());
});

/*STICKY ACTION BUTTON DIV*/
function sticky_relocate() {
    var window_top = $(window).scrollTop() + $("header .header-wrapper").height();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
        $('#sticky-anchor').height($('#sticky').outerHeight() + 20);
        $('#sticky').width($('#sticky-anchor').outerWidth() - 22);
    } else {
        $('#sticky').removeClass('stick');
        $('#sticky-anchor').height(0);
        $('#sticky').css ("width","100%")
    }
}
$(function() {
    $(window).scroll(sticky_relocate);
    sticky_relocate();
});
