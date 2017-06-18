$(document).ready(function () {
    const PERCENT_TO_NUMBER = 0.01;
    const PERSONAL_INC_TAX_RATE = 0.13;
    const PENSION_TAX_RATE = 0.22;
    const MEDICAL_INSURANCE_RATE = 0.051;
    const SOCIAL_INSURANCE_RATE = 0.029;
    const ACCIDENT_INSURANCE_RATE = 0.002;

    const DEDUCTION_PER_CHILD = 1400;
    const DEDUCTION_THIRD_CHILD = 3000;
    const DEDUCTION_DISABLED_CHILD = 12000;

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

    var deductionChildren = 0;
    var deductionDisabledChildren = 0;
    var otherDeductionFOT = 0;
    var otherDeduction = 0;
    var allDeductions = 0;
    var salaryBeforeTaxWithDeduct = 0;

    function taxEmployerCalculation() {
        pensionTax = parseInt((salaryBeforeTax * PENSION_TAX_RATE).toFixed());
        medicalInsurance = parseInt((salaryBeforeTax * MEDICAL_INSURANCE_RATE).toFixed());
        socialInsurance = parseInt((salaryBeforeTax * SOCIAL_INSURANCE_RATE).toFixed());
        if (accidentInsuranceRatio === 0)
            accidentInsurance = parseInt((salaryBeforeTax * ACCIDENT_INSURANCE_RATE).toFixed());
        else
            accidentInsurance = parseInt((salaryBeforeTax * accidentInsuranceRatio).toFixed());

        total = pensionTax + medicalInsurance + socialInsurance + accidentInsurance;
        allTaxes = personalIncomeTax + total;
        $('#pfr').text(pensionTax.toLocaleString());
        $('#ffoms').text(medicalInsurance.toLocaleString());
        $('#fss').text(socialInsurance.toLocaleString());
        $('#fss-nc').text(accidentInsurance.toLocaleString());
        $('#total').text(total.toLocaleString());
        $('#all').text(allTaxes.toLocaleString());
    }

    function taxCalculation() {
        if ($('#variant-1').prop("checked")) {
            salaryBeforeTaxWithDeduct = salaryBeforeTax - allDeductions;
            if (salaryBeforeTaxWithDeduct <= 0)
                personalIncomeTax = 0;
            else
                personalIncomeTax = parseInt((salaryBeforeTaxWithDeduct * PERSONAL_INC_TAX_RATE).toFixed());
            salaryAfterTax = parseInt((salaryBeforeTax - personalIncomeTax).toFixed());
            allTaxes = personalIncomeTax + total;
            $('#all').text(allTaxes.toLocaleString());
            $('#salary').text(salaryAfterTax.toLocaleString());
            $('#ndfl').text(personalIncomeTax.toLocaleString());
        } else {
            salaryBeforeTax = parseInt(((salaryAfterTax - allDeductions * PERSONAL_INC_TAX_RATE) / (1 - PERSONAL_INC_TAX_RATE)).toFixed());
            salaryBeforeTaxWithDeduct = salaryBeforeTax - allDeductions;
            if (salaryBeforeTaxWithDeduct <= 0)
                personalIncomeTax = 0;
            else
                personalIncomeTax = parseInt((salaryBeforeTaxWithDeduct * PERSONAL_INC_TAX_RATE).toFixed());

            taxEmployerCalculation();

            $('#salary-rev').text(salaryBeforeTax.toLocaleString());
            $('#ndfl').text(personalIncomeTax.toLocaleString());
        }
    }

    $(':radio[name=children]').change(function () {
        allDeductions -= deductionChildren;
        var numberOfChildren = $(':radio[name=children]').filter(':checked').val() * 1;
        if (numberOfChildren === 1)
            deductionChildren = DEDUCTION_PER_CHILD;
        else
            deductionChildren = DEDUCTION_PER_CHILD * 2 + DEDUCTION_THIRD_CHILD * (numberOfChildren - 2);
        allDeductions += deductionChildren;

        taxCalculation();
    });

    $(':radio[name=children-dis]').change(function () {
        allDeductions -= deductionDisabledChildren;
        var numberOfDisabled = $(':radio[name=children-dis]').filter(':checked').val() * 1; // string to number
        deductionDisabledChildren = DEDUCTION_DISABLED_CHILD * numberOfDisabled;
        allDeductions += deductionDisabledChildren;

        taxCalculation();
    });

    $('#fot-other-deduct').bind('input', function () {
        allDeductions -= otherDeductionFOT;
        otherDeductionFOT = $('#fot-other-deduct').val().replace(/,/, '.').replace(/\s/g, '') * 1;
        allDeductions += otherDeductionFOT;

        taxCalculation();
    });

    $('#other-deduct').bind('input', function () {
        allDeductions -= otherDeduction;
        otherDeduction = $('#other-deduct').val().replace(/,/, '.').replace(/\s/g, '') * 1;
        allDeductions += otherDeduction;

        taxCalculation();
    });


    $('#accidents').bind('input', function () {
        accidentInsuranceRatio = $('#accidents').val().replace(/,/, '.').replace(/\s/g, '') * PERCENT_TO_NUMBER;
        if (salaryBeforeTax === 0)
            return;
        if (accidentInsuranceRatio === 0)
            accidentInsuranceRatio = ACCIDENT_INSURANCE_RATE;
        accidentInsurance = parseInt((salaryBeforeTax * accidentInsuranceRatio).toFixed());
        $('#fss-nc').text(accidentInsurance.toLocaleString());
        total = pensionTax + medicalInsurance + socialInsurance + accidentInsurance;
        allTaxes = personalIncomeTax + total;
        $('#total').text(total.toLocaleString());
        $('#all').text(allTaxes.toLocaleString());
    });

    $('#salary-before').bind('input', function () {
        salaryBeforeTax = $('#salary-before').val().replace(/,/, '.').replace(/\s/g, '') * 1;
        salaryBeforeTaxWithDeduct = salaryBeforeTax - allDeductions;
        if (salaryBeforeTaxWithDeduct <= 0)
            personalIncomeTax = 0;
        else
            personalIncomeTax = parseInt((salaryBeforeTaxWithDeduct * PERSONAL_INC_TAX_RATE).toFixed());
        salaryAfterTax = parseInt((salaryBeforeTax - personalIncomeTax).toFixed());

        taxEmployerCalculation();

        $('#salary').text(salaryAfterTax.toLocaleString());
        $('#ndfl').text(personalIncomeTax.toLocaleString());
    });

    $('#salary-after').bind('input', function () {
        salaryAfterTax = $('#salary-after').val().replace(/,/, '.').replace(/\s/g, '') * 1;
        salaryBeforeTax = parseInt(((salaryAfterTax - allDeductions * PERSONAL_INC_TAX_RATE) / (1 - PERSONAL_INC_TAX_RATE)).toFixed());
        salaryBeforeTaxWithDeduct = salaryBeforeTax - allDeductions;
        if (salaryBeforeTaxWithDeduct <= 0)
            personalIncomeTax = 0;
        else
            personalIncomeTax = parseInt((salaryBeforeTax - salaryAfterTax).toFixed());

        taxEmployerCalculation();

        $('#salary-rev').text(salaryBeforeTax.toLocaleString());
        $('#ndfl').text(personalIncomeTax.toLocaleString());
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
        deductionChildren = 0;
        deductionDisabledChildren = 0;
        otherDeductionFOT = 0;
        otherDeduction = 0;
        allDeductions = 0;
        salaryBeforeTaxWithDeduct = 0;
        $('.text').val('');
        $('#salary').text('26 100');
        $('#salary-rev').text('30 000');
        $('#ndfl').text('3 900');
        $('#pfr').text('6 600');
        $('#ffoms').text('1 530');
        $('#fss').text('870');
        $('#fss-nc').text('60');
        $('#total').text('9 060');
        $('#all').text('12 960');
        $(':radio[name=children]').prop('checked', false);
        $(':radio[name=children-dis]').prop('checked', false);
        $('#children-disabled').prop('checked', false);
        $('#fot-deductions').prop('checked', false);
        $('#add-deductions').prop('checked', false);
        $('#input-field-5').css('display', 'none');
        $('#input-field-6').css('display', 'none');
        $('#input-field-7').css('display', 'none');
    });
});

/* получение/потеря фокуса поля ввода зарплаты при прямом и обратном расчете */

$(document).ready(function () {
    $('.salary').bind('focus', function () {
        if ($(this).val() === '')
            $('.output').text('0');
    });
});

$(document).ready(function () {
    $('.salary').bind('blur', function () {
        if ($(this).val() === '') {
            $('#salary').text('26 100');
            $('#salary-rev').text('30 000');
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