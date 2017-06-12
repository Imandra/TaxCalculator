$(document).ready(function () {
    var salaryBeforeTax = 0;
    var personalIncomeTax = 0;
    var salaryAfterTax = 0;
    var pensionTax = 0;
    var medicalInsurance = 0;
    var socialInsurance = 0;
    var socialInsuranceAccidents = 0;
    var total = 0;
    var allTaxes = 0;
    var accidents = 0;

    $('#accidents').bind('keyup change', function () {
        accidents = $('#accidents').val().replace(/,/, '.').replace(/\s/g, '') * 0.01;
        if (accidents == 0)
            accidents = 0.002;
        socialInsuranceAccidents = parseInt((salaryBeforeTax * accidents).toFixed());
        $('#fss-nc').text(socialInsuranceAccidents.toLocaleString());
        total = pensionTax + medicalInsurance + socialInsurance + socialInsuranceAccidents;
        allTaxes = personalIncomeTax + total;
        $('#total').text(total.toLocaleString());
        $('#all').text(allTaxes.toLocaleString());
    });

    $('#salary-before').bind('keyup change', function () {
        salaryBeforeTax = $('#salary-before').val().replace(/,/, '.').replace(/\s/g, '') * 1;
        personalIncomeTax = parseInt((salaryBeforeTax * 0.13).toFixed());
        salaryAfterTax = parseInt((salaryBeforeTax - personalIncomeTax).toFixed());
        pensionTax = parseInt((salaryBeforeTax * 0.22).toFixed());
        medicalInsurance = parseInt((salaryBeforeTax * 0.051).toFixed());
        socialInsurance = parseInt((salaryBeforeTax * 0.029).toFixed());

        if (accidents == 0)
            socialInsuranceAccidents = parseInt((salaryBeforeTax * 0.002).toFixed());
        else
            socialInsuranceAccidents = parseInt((salaryBeforeTax * accidents).toFixed());

        total = pensionTax + medicalInsurance + socialInsurance + socialInsuranceAccidents;
        allTaxes = personalIncomeTax + total;

        $('#salary').text(salaryAfterTax.toLocaleString());
        $('#ndfl').text(personalIncomeTax.toLocaleString());
        $('#pfr').text(pensionTax.toLocaleString());
        $('#ffoms').text(medicalInsurance.toLocaleString());
        $('#fss').text(socialInsurance.toLocaleString());
        $('#fss-nc').text(socialInsuranceAccidents.toLocaleString());
        $('#total').text(total.toLocaleString());
        $('#all').text(allTaxes.toLocaleString());
    });
});