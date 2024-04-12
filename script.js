$(document).ready(function() {
    // Enable popovers
    $('[data-toggle="popover"]').popover({
        trigger: 'manual',
        template: '<div class="popover error-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    });

    $('#calculateTax').click(function() {
        let age = $('#age').val();
        let grossIncome = parseFloat($('#grossIncome').val());
        let extraIncome = parseFloat($('#extraIncome').val());
        let deductions = parseFloat($('#deductions').val());

        // Reset error indicators and popovers
        $('.error-icon').popover('hide').removeClass('border-danger');

        // Validate inputs
        if (isNaN(grossIncome) || grossIncome < 0) {
            showError($('#grossIncomeError'), 'Invalid Gross Income');
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            showError($('#extraIncomeError'), 'Invalid Extra Income');
        }
        if (isNaN(deductions) || deductions < 0) {
            showError($('#deductionsError'), 'Invalid Deductions');
        }

        if (!isNaN(grossIncome) && grossIncome >= 0 && !isNaN(extraIncome) && extraIncome >= 0 && !isNaN(deductions) && deductions >= 0) {
            let totalIncome = grossIncome + extraIncome - deductions;
            let tax = 0;

            if (totalIncome > 800000) {
                if (age === '<40') {
                    tax = 0.3 * (totalIncome - 800000);
                } else if (age === '≥40&<60') {
                    tax = 0.4 * (totalIncome - 800000);
                } else if (age === '≥60') {
                    tax = 0.1 * (totalIncome - 800000);
                }
            }

            let taxResult = `<h5>after tax deductions:<h5> ${tax.toFixed(2)} Lakhs`;
            $('#taxResult').html(taxResult);
            // Show modal with tax result
            $('#taxResultModal').modal('show');
        } else {
            $('#taxResult').html('');
        }
    });

    function showError(element, message) {
        element.addClass('border-danger').attr('data-content', message).popover('show');
    }
});
