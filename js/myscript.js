document.addEventListener("DOMContentLoaded", function(){
    var initialPayment = 0;         //Первоначальный взнос
    var initialPaymentMin = 0;      //Минимальный первоначальный взнос
    var loanAmount = 1500000;       //Сумма кредита
    var loanAmountMax = 5000000;    //Максимальная сумма кредита
    var amountStep = 50000;         //Шаг суммы кредита
    var currency = '₽';             //Символ валюты кредита
    var rate = 12.5;                //Процентная ставка
    var minRate = 5;                //Минимальная процентная ставка
    var maxRate = 30;               //Максимальная процентная ставка
    var paymentPeriod = 240;        //Период кредита в месяцах
    var paymentPeriodMin = 1;       //Минимальный период кредита в месяцах
    var paymentPeriodMax = 360;     //Максимальный период кредита в месяцах
    var dateOfFirstPayment = "";    //Дата начала выплаты кредита
    
    //Ф-ция вывода результата расчета кредита
    function calcLoan() {
        var monthlyPaymentDiv = document.getElementById('monthly_payment');
        var overpaymentDiv = document.getElementById('overpayment');
        var totalCostDiv = document.getElementById('total_cost');
        var initialPaySymbDiv = document.getElementById('initial_pay_symb');
        
        var amount = loanAmount - initialPayment;
        var monthlyPayment = (amount * (rate / 1200)) / (1 - Math.pow((1 + (rate/1200)), -paymentPeriod));
        var totalCost = monthlyPayment * paymentPeriod;
        var overpayment = totalCost - amount;
        
        monthlyPaymentDiv.innerHTML = Math.round(monthlyPayment) + ' ' + currency;
        overpaymentDiv.innerHTML = Math.round(overpayment) + ' ' + currency;
        totalCostDiv.innerHTML = Math.round(totalCost) + ' ' + currency;
        initialPaySymbDiv.innerHTML = currency;
    }
    
    //События бегунков
    function initialPayRangeEvent() {
        var initialPayInput = document.getElementById('initial_pay_input');
        var initialPayRange = document.getElementById('initial_pay_range');
        var loanAmountInput = document.getElementById('loan_amount_input');
        if(+initialPayRange.value >= (+loanAmountInput.value - amountStep)) {
            initialPayRange.value = +loanAmountInput.value - amountStep;
        }
        initialPayInput.value = initialPayRange.value;
        initialPayment = +initialPayInput.value;
        calcLoan();
    }
    
    function loanAmountRangeEvent() {
        var loanAmountInput = document.getElementById('loan_amount_input');
        var loanAmountRange = document.getElementById('loan_amount_range');
        var initialPayInput = document.getElementById('initial_pay_input');
        if(+loanAmountRange.value <= (+initialPayInput.value + amountStep)) {
            loanAmountRange.value = +initialPayInput.value + amountStep;
        }
        loanAmountInput.value = loanAmountRange.value;
        loanAmount = +loanAmountInput.value;
        calcLoan();
    }
    
    function rateRangeEvent() {
        var rateInput = document.getElementById('rate_input');
        var rateRange = document.getElementById('rate_range');
        rateInput.value = +rateRange.value;
        rate = rateInput.value;
        calcLoan();
    }
    
    function periodRangeEvent() {
        var periodInput = document.getElementById('period_input');
        var periodRange = document.getElementById('period_range');
        periodInput.value = periodRange.value;
        paymentPeriod = +periodInput.value;
        calcLoan();
    }
    
    //События полей ввода данных
    function initialPayInputEvent() {
        var initialPayInput = document.getElementById('initial_pay_input');
        var initialPayRange = document.getElementById('initial_pay_range');
        var loanAmountInput = document.getElementById('loan_amount_input');
        
        if(isNaN(+initialPayInput.value)) initialPayInput.value = initialPayment;
        
        if(+initialPayInput.value >= +loanAmountInput.value) {
            initialPayInput.value = +loanAmountInput.value;
        }
        if(+initialPayInput.value < initialPaymentMin) initialPayInput.value = 0;
        initialPayRange.value = initialPayInput.value;
        initialPayment = +initialPayInput.value;
        calcLoan();
    }
    
    function loanAmountInputEvent() {
        var loanAmountInput = document.getElementById('loan_amount_input');
        var loanAmountRange = document.getElementById('loan_amount_range');
        var initialPayInput = document.getElementById('initial_pay_input');
        
        if(isNaN(+loanAmountInput.value)) loanAmountInput.value = loanAmount;
        
        if(+loanAmountInput.value <= +initialPayInput.value) {
            loanAmountInput.value = +initialPayInput.value;
        }
        if(+loanAmountInput.value > loanAmountMax) loanAmountInput.value = loanAmountMax;
        loanAmountRange.value = loanAmountInput.value;
        loanAmount = +loanAmountInput.value;
        calcLoan();
    }
    
    function rateInputEvent() {
        var rateInput = document.getElementById('rate_input');
        var rateRange = document.getElementById('rate_range');
        
        if(isNaN(+rateInput.value)) rateInput.value = rate;
        
        if(+rateInput.value > maxRate) rateInput.value = maxRate;
        if(+rateInput.value < minRate) rateInput.value = minRate;
        rateRange.value = +rateInput.value;
        rate = rateInput.value;
        calcLoan();
    }
    
    function periodInputEvent() {
        var periodInput = document.getElementById('period_input');
        var periodRange = document.getElementById('period_range');
        
        if(isNaN(+periodInput.value)) periodInput.value = paymentPeriod;
        
        if(+periodInput.value > paymentPeriodMax) periodInput.value = paymentPeriodMax;
        if(+periodInput.value < paymentPeriodMin) periodInput.value = paymentPeriodMin;
        periodRange.value = periodInput.value;
        paymentPeriod = +periodInput.value;
        calcLoan();
    }
    
    //Событие выбора валюты
    function currencySelectEvent() {
        var currencySelect = document.getElementById('currency_select');
        switch(currencySelect.selectedIndex) {
            case 0: {
                currency = '₽';
                break;
            }
            case 1: {
                currency = '$';
                break;
            }
            case 2: {
                currency = '€';
                break;
            }
            case 3: {
                currency = '£';
            }
        }
        calcLoan();
    }
    
    //Навешиваем события
    function setEvents() {
        var initialPayRange = document.getElementById('initial_pay_range');
        var loanAmountRange = document.getElementById('loan_amount_range');
        var rateRange = document.getElementById('rate_range');
        var periodRange = document.getElementById('period_range');
        
        var initialPayInput = document.getElementById('initial_pay_input');
        var loanAmountInput = document.getElementById('loan_amount_input');
        var rateInput = document.getElementById('rate_input');
        var periodInput = document.getElementById('period_input');
        
        var currencySelect = document.getElementById('currency_select');
        
        initialPayRange.addEventListener('input', initialPayRangeEvent);
        loanAmountRange.addEventListener('input', loanAmountRangeEvent);
        rateRange.addEventListener('input', rateRangeEvent);
        periodRange.addEventListener('input', periodRangeEvent);
        
        initialPayInput.addEventListener('change', initialPayInputEvent);
        loanAmountInput.addEventListener('change', loanAmountInputEvent);
        rateInput.addEventListener('change', rateInputEvent);
        periodInput.addEventListener('change', periodInputEvent);
        
        currencySelect.addEventListener('change', currencySelectEvent);
    }
    
    $("#first_pay_date").datepicker({
        dateFormat: "dd.mm.yy"
    });
    dateOfFirstPayment = new Date();
    $( "#first_pay_date" ).datepicker( "setDate", dateOfFirstPayment);  
    
    setEvents();
    calcLoan();
});