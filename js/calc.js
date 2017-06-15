$(document).ready(function () {
    const PERCENT_TO_NUMBER = 0.01;
    const PERSONAL_INC_TAX_RATE = 13;
    const PENSION_TAX_RATE = 22;
    const MEDICAL_INSURANCE_RATE = 5.1;
    const SOCIAL_INSURANCE_RATE = 2.9;
    const ACCIDENT_INSURANCE_RATE = 0.2;

    var salaryBeforeTax = 0;
    var personalIncomeTax = 0;
    var salaryAfterTax = 0;
    var pensionTax = 0;
    var medicalInsurance = 0;
    var socialInsurance = 0;
    var accidentInsurance = 0;
    var total = 0;
    var allTaxes = 0;
    var accidentInsuranceRatio = 0;

    $('#accidents').bind('input', function () {
        accidentInsuranceRatio = $('#accidents').val().replace(/,/, '.').replace(/\s/g, '') * PERCENT_TO_NUMBER;
        if (salaryBeforeTax === 0)
            return;
        if (accidentInsuranceRatio === 0)
            accidentInsuranceRatio = ACCIDENT_INSURANCE_RATE * PERCENT_TO_NUMBER;
        accidentInsurance = parseInt((salaryBeforeTax * accidentInsuranceRatio).toFixed());
        $('#fss-nc').text(accidentInsurance.toLocaleString());
        total = pensionTax + medicalInsurance + socialInsurance + accidentInsurance;
        allTaxes = personalIncomeTax + total;
        $('#total').text(total.toLocaleString());
        $('#all').text(allTaxes.toLocaleString());
    });

    $('#salary-before').bind('input', function () {
        salaryBeforeTax = $('#salary-before').val().replace(/,/, '.').replace(/\s/g, '') * 1; // string to number
        personalIncomeTax = parseInt((salaryBeforeTax * PERSONAL_INC_TAX_RATE * PERCENT_TO_NUMBER).toFixed());
        salaryAfterTax = parseInt((salaryBeforeTax - personalIncomeTax).toFixed());
        pensionTax = parseInt((salaryBeforeTax * PENSION_TAX_RATE * PERCENT_TO_NUMBER).toFixed());
        medicalInsurance = parseInt((salaryBeforeTax * MEDICAL_INSURANCE_RATE * PERCENT_TO_NUMBER).toFixed());
        socialInsurance = parseInt((salaryBeforeTax * SOCIAL_INSURANCE_RATE * PERCENT_TO_NUMBER).toFixed());

        if (accidentInsuranceRatio === 0)
            accidentInsurance = parseInt((salaryBeforeTax * ACCIDENT_INSURANCE_RATE * PERCENT_TO_NUMBER).toFixed());
        else
            accidentInsurance = parseInt((salaryBeforeTax * accidentInsuranceRatio).toFixed());

        total = pensionTax + medicalInsurance + socialInsurance + accidentInsurance;
        allTaxes = personalIncomeTax + total;

        $('#salary').text(salaryAfterTax.toLocaleString());
        $('#ndfl').text(personalIncomeTax.toLocaleString());
        $('#pfr').text(pensionTax.toLocaleString());
        $('#ffoms').text(medicalInsurance.toLocaleString());
        $('#fss').text(socialInsurance.toLocaleString());
        $('#fss-nc').text(accidentInsurance.toLocaleString());
        $('#total').text(total.toLocaleString());
        $('#all').text(allTaxes.toLocaleString());
    });

    $('.clear-btn').click(function () {
        salaryBeforeTax = 0;
        personalIncomeTax = 0;
        salaryAfterTax = 0;
        pensionTax = 0;
        medicalInsurance = 0;
        socialInsurance = 0;
        accidentInsurance = 0;
        total = 0;
        allTaxes = 0;
        accidentInsuranceRatio = 0;
        $('.text').val('');
        $('#salary').text('26 100');
        $('#ndfl').text('3 900');
        $('#pfr').text('6 600');
        $('#ffoms').text('1 530');
        $('#fss').text('870');
        $('#fss-nc').text('60');
        $('#total').text('9 060');
        $('#all').text('12 960');
    });
});

$(document).ready(function () {
    $("#salary-before").bind('focus', function () {
        if ($("#salary-before").val() === '')
            $('.output').text('0');
    });
});

$(document).ready(function () {
    $("#salary-before").bind('blur', function () {
        if ($("#salary-before").val() === '') {
            $('#salary').text('26 100');
            $('#ndfl').text('3 900');
            $('#pfr').text('6 600');
            $('#ffoms').text('1 530');
            $('#fss').text('870');
            $('#fss-nc').text('60');
            $('#total').text('9 060');
            $('#all').text('12 960');
        }
    });
});