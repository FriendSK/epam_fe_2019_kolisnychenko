describe('pizza()', () => {
  let pizza;
  let params;

  beforeEach(() => {
    params = ['bacon', 'pepperoni', 'olives', 'corn'];
    const size = 'large';
    pizza = new Pizza(params, size);
  });

  it('should initialize pizza', () => {
    expect(pizza.toppings).toEqual(params);
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

    it('should handle if there is no topping', () => {
      incorrectPizza = new Pizza(['cheese'], 'small');
      spyOnProperty(incorrectPizza, 'toppingsPrice', 'get').and.callThrough();
      expect(() => incorrectPizza.toppingsPrice).toThrowError(`Topping cheese can't find`);
    });

    it('should handle if there is no toppings', () => {
      incorrectPizza = new Pizza('', 'small');
      spyOnProperty(incorrectPizza, 'toppingsPrice', 'get').and.callThrough();
      expect(() => incorrectPizza.toppingsPrice).toThrowError(`Toppings can't find`);
    });
  });
});
