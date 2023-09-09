beforeEach(function() {
  value = {amount: 100, years: 1, rate: 0.05};
  zeroLoan = {amount: 0, years: 1, rate: 0.05};
})

it('should calculate the monthly rate correctly', function () {
  // let value = {amount: 100, years: 1, rate: 0.05};
  expect(calculateMonthlyPayment(value)).toEqual(8.56);
  expect(calculateMonthlyPayment(zeroLoan)).toEqual(0.00);
});


it("should return a result with 2 decimal places", function() {
  // let value = {amount: 100, years: 1, rate: 0.05};
  expect(calculateMonthlyPayment(value)).toMatch(/\d+\.\d\d/);
});
