describe('order()', () => {
  let order;
  let pizza;

  beforeEach(() => {
    const params = ['bacon', 'pepperoni', 'olives', 'corn'];
    const size = 'large';
    order = new Order();
    pizza = new Pizza(params, size);
  });

  it('should initialize pizzas', () => {
    expect(order.pizzas).toEqual([]);
  });

  it('should be unique order', () => {
    const order2 = new Order();
    expect(order).not.toBe(order2);
  });

  it('has common operations', () => {
    expect(order.addPizza).toBeDefined();
    expect(order.removePizza).toBeDefined();
  });

  describe('get totalPrice()', () => {
    it('should get total price of pizzas', () => {
      order.addPizza(pizza);
      spyOnProperty(order, 'totalPrice', 'get').and.callThrough();
      expect(order.totalPrice).toBe(4.2);
    });

    it('should handles if there is no pizzas price', () => {
      zeroCostPizza = new Pizza([], 'small');
      order.addPizza(zeroCostPizza);
      spyOnProperty(order, 'totalPrice', 'get').and.callThrough();
      expect(() => order.totalPrice).toThrowError(`Pizza can't cost 0 USD`);
    });
  });

  describe('addPizza()', () => {
    it('should calculate pizzas cost', () => {
      spyOn(order.pizzas, 'reduce');
      order.addPizza(pizza);
      order.totalPrice;
      expect(order.pizzas.reduce).toHaveBeenCalled();
    });
  });

  describe('addPizza()', () => {
    it('should check addPizza method', () => {
      spyOn(order, 'addPizza');
      order.addPizza(pizza);
      order.addPizza(pizza);
      expect(order.addPizza).toHaveBeenCalledTimes(2);
    });

    it('should call addPizza with right arguments', () => {
        spyOn(order, 'addPizza');
        order.addPizza(pizza);
        order.addPizza(pizza);
        expect(order.addPizza).toHaveBeenCalledWith(pizza);
    });

    it('should add pizza to order', () => {
        order.addPizza(pizza);
        expect(order.pizzas).toEqual([pizza]);
      });
  });

  describe('removePizza()', () => {
    it('should call removePizza method', () => {
      spyOn(order, 'removePizza');
      order.removePizza(pizza);
      order.removePizza(pizza);
      expect(order.removePizza).toHaveBeenCalledTimes(2);
    });

    it('should call removePizza with right arguments', () => {
        spyOn(order, 'removePizza');
        order.addPizza(pizza);
        order.removePizza(pizza);
        expect(order.removePizza).toHaveBeenCalledWith(pizza);
    });

    it('should remove pizza from order', () => {
        order.removePizza(pizza);
        expect(order.pizzas).toEqual([]);
      });
  });
});
