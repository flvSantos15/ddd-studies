import Customer from "../domain/entity/customer";
import Order from "../domain/entity/order";
import OrderItem from "../domain/entity/order_item";
import OrderService from "./order.service";

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer("c1", "customer 1")
    const orderItem1 = new OrderItem("o1", "item 1", 10, "p1", 1)

    const order = OrderService.placeOrder(customer, [orderItem1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })

  it('should get total of all orders', () => {
    // Arrange
    const item1 = new OrderItem('item1', 'Item 1', 100, 'p1', 1);
    const item2 = new OrderItem('item2', 'Item 2', 200, 'p2', 2);

    const order = new Order('o1', 'c1', [item1])
    const order2 = new Order('o2', 'c2', [item2])

    const total = OrderService.total([order, order2])

    expect(total).toBe(500)
  })
})