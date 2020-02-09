describe('pizza()', () => {
  let pizza;

  beforeEach(() => {
    pizza = new Pizza(['bacon', 'pepperoni', 'olives', 'corn'], 'large');
  });

  it('should initialize pizza', () => {
    expect(pizza.toppings).toEqual(['bacon', 'pepperoni', 'olives', 'corn']);
    expect(pizza.size).toEqual('large');
  });

  describe('get pizzaPrice()', () => {
    it('should get price of pizza', () => {
      spyOnProperty(pizza, 'pizzaPrice', 'get').and.callThrough();
      expect(pizza.pizzaPrice).toBe(4.2);
    });

    it('should handle if there is no pizzas size', () => {
      incorrectPizza = new Pizza(['bacon'], 'extra');
      spyOnProperty(incorrectPizza, 'pizzaPrice', 'get').and.callThrough();
      expect(() => incorrectPizza.pizzaPrice).toThrowError(`Size can't find`);
    });
  });

  describe('get toppingsPrice()', () => {
    it('should get price of toppings', () => {
      spyOnProperty(pizza, 'toppingsPrice', 'get').and.callThrough();
      expect(pizza.toppingsPrice).toBe(2.1);
    });

    it('should calculate toppings prise', () => {
      spyOn(pizza.toppings, 'reduce');
      pizza.toppingsPrice;
      expect(pizza.toppings.reduce).toHaveBeenCalled();
    });

    it('should handle if there is no topping', () => {
      incorrectPizza = new Pizza(['cheese'], 'small');
      spyOnProperty(incorrectPizza, 'toppingsPrice', 'get').and.callThrough();
      expect(() => incorrectPizza.toppingsPrice).toThrowError(`Topping cheese can't find`);
    });

    it('should handle if there is no toppings', () => {
      incorrectPizza = new Pizza('', 'small');
      spyOnProperty(incorrectPizza, 'toppingsPrice', 'get').and.callThrough();
      expect(() => incorrectPizza.toppingsPrice).toThrow();
    });
  });
});
