describe('Tests for: helpers.js', function() {
    beforeAll(function() {
        mockPayments = {
            payment1: {billAmt: 10, tipAmt: 2, tipPercent: 20},
            payment2: {billAmt: 10, tipAmt: 2, tipPercent: 20},
            payment3: {billAmt: 10, tipAmt: 2, tipPercent: 20},
        };

        mockEmpty = {};

        mockTr = document.createElement('tr');
    });

    describe('When sumPaymentTotal is called...', function() {
        it('should correctly calculate the sum of payments by type.', function() {
            allPayments = mockPayments;
            expect(sumPaymentTotal('billAmt')).toEqual(30);
            expect(sumPaymentTotal('tipAmt')).toEqual(6);
            expect(sumPaymentTotal('tipPercent')).toEqual(60);
        });

        it('should return a sum of zero if all payments is empty.', function() {
            allPayments = mockEmpty;
            expect(sumPaymentTotal('billAmt')).toEqual(0);
            expect(sumPaymentTotal('tipAmt')).toEqual(0);
            expect(sumPaymentTotal('tipPercent')).toEqual(0);
        });

        afterEach(function() {
            allPayments = {};
        });
    });

    describe('When calculateTipPercent is called...', function() {
        it('should correctly calculate the tip percentage', function() {
            expect(calculateTipPercent(10, 2)).toEqual(20);
        });

        it('should return zero when tip amount is zero', function() {
            expect(calculateTipPercent(10, 0)).toEqual(0);
        });
    });

    describe('When appendTd is called...', function() {
        it('should append a new table data to table row', function() {
            appendTd(mockTr, "text inside td");
            expect(mockTr.children[0].tagName).toEqual("TD");
            expect(mockTr.children[0].innerText).toEqual("text inside td");
        });

        afterEach(function() {
            mockTr.innerHTML = '';
        });
    });

    describe('When appendDeleteBtn is called...', function() {
        it('should append a new table data to table row', function() {
            appendDeleteBtn(mockTr);

            expect(mockTr.children[0].tagName).toEqual("TD");
            expect(mockTr.children[0].innerText).toEqual("X");
        });

        afterEach(function() {
            mockTr.innerHTML = '';
        });
    });
});
  