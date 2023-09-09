describe('Tests for: payments.js', function() {
    beforeAll(function() {
        mockCurrentPayment = {
            billAmt: 10,
            tipAmt: 2,
            tipPercent: 20,
        }

        mockAllPayments = {
            payment1: mockCurrentPayment,
            payment2: mockCurrentPayment,
            payment3: mockCurrentPayment,
        }
    })
    
    describe('When submitPaymentInfo is called...', function() {
        beforeEach(function() {
            billAmtInput.value = 10;
            tipAmtInput.value = 2;
            submitPaymentInfo();
        });

        it('should add current payment to all payments.', function() {
            this.keys = Object.keys(allPayments);
            expect(this.keys.length).toEqual(1);
            expect(this.keys[0]).toEqual("payment1");

        });

        it('should increment the payment id by one.', function() {
            expect(paymentId).toEqual(1);
        });

        it('should reset and clear all inputs.', function() {
            expect(billAmtInput.value).toEqual('');
            expect(tipAmtInput.value).toEqual('');
        });
    });

    describe('When createCurPayment is called...', function() {
        describe('When inputs are invalid...', function() {
            it('should return undefined when bill amount is zero.', function() {
                billAmtInput.value = 0;
                tipAmtInput.value = 1;
                expect(createCurPayment()).toBeUndefined();
            });

            it('should return undefined when tip amount less than zero.', function() {
                billAmtInput.value = 0;
                tipAmtInput.value = -1;
                expect(createCurPayment()).toBeUndefined();
            });

            it('should return undefined when bill amount is empty.', function() {
                billAmtInput.value = '';
                tipAmtInput.value = 1;
                expect(createCurPayment()).toBeUndefined();
            });

            it('should return undefined when tip amount is empty.', function() {
                billAmtInput.value = 1;
                tipAmtInput.value = '';
                expect(createCurPayment()).toBeUndefined();
            });
        });

        describe('When inputs are valid...', function() {
            beforeEach(function() {
                billAmtInput.value = 1;
                tipAmtInput.value = 1;
            });

            it('should be greater than zero for the bill amount input.', function() {
                expect(billAmtInput.value).toBeGreaterThan(0);
            });

            it('should be greater than or equal to zero for the tip amount input.', function() {
                expect(tipAmtInput.value).toBeGreaterThanOrEqual(0);
            });

            it('should return a current payment object successfully', function() {
                this.payment = createCurPayment();
                this.keys = Object.keys(this.payment);
                expect(this.keys.length).toEqual(3);
                expect(this.keys).toContain("billAmt");
                expect(this.keys).toContain("tipAmt");
                expect(this.keys).toContain("tipPercent");
                expect(this.payment.billAmt).toBeGreaterThan(0);
                expect(this.payment.billAmt).toEqual('1');
                expect(this.payment.tipAmt).toBeGreaterThanOrEqual(0);
                expect(this.payment.tipAmt).toEqual('1');
                expect(this.payment.tipPercent).toBeGreaterThanOrEqual(0);
                expect(this.payment.tipPercent).toEqual(100);
            });
        });
    });

    describe('When appendPaymentTable is called...', function() {
        it('should append a new table row to paymentTbody.', function() {
            appendPaymentTable(mockCurrentPayment);

            expect(paymentTbody.children.length).toEqual(1);
            expect(paymentTbody.children[0].tagName).toEqual('TR');
        });
    });

    describe('When updateSummary is called...', function() {
        it('should display the correct summary.', function() {
            allPayments = mockAllPayments;
            updateSummary();

            expect(summaryTds[0].innerHTML).toEqual('$30')
            expect(summaryTds[1].innerHTML).toEqual('$6')
            expect(summaryTds[2].innerHTML).toEqual('20%')
        });
    });

    afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';

        allPayments = {};
        paymentId = 0;

        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    })
});