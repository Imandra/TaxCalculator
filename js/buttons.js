$(document).ready(function () {
    $('.open-btn').click(function () {
        $('.calc-block').addClass('active');
        $(this).css('display', 'none');
        $('.clear-btn').css('display', 'block');
    });
    $('.clear-btn').hover(
        function () {
            $(this).append($('<span>Очистить</span>'));
            $(this).addClass('big-clear-btn');
        },
        function () {
            $(this).find('span:last').remove();
            $(this).removeClass('big-clear-btn');
        }
    );
});