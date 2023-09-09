beforeEach(function() {
  mock0 = {amount: 0, years: 1, rate: 0.05};
  mock1 = {amount: 100, years: 1, rate: 0.05};
})

it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment(mock1)).toEqual(8.56);
  expect(calculateMonthlyPayment(mock0)).toEqual(0.00);
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment(mock1)).toMatch(/\d+\.\d\d/);
});
