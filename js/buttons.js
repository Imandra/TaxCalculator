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

$(document).ready(function () {
    $("#children").change(function () {
        if ($(this).prop('checked')) {
            $('#input-field-4').css('display', 'block');

        } else {
            $('#input-field-4').css('display', 'none');
        }
    });

    $("#children-disabled").change(function () {
        if ($(this).prop('checked')) {
            $('#input-field-5').css('display', 'block');

        } else {
            $('#input-field-5').css('display', 'none');
        }
    });

    $("#fot-deductions").change(function () {
        if ($(this).prop('checked')) {
            $('#input-field-6').css('display', 'block');

        } else {
            $('#input-field-6').css('display', 'none');
        }
    });

    $("#add-deductions").change(function () {
        if ($(this).prop('checked')) {
            $('#input-field-7').css('display', 'block');

        } else {
            $('#input-field-7').css('display', 'none');
        }
    });
});