import Order from './domain/checkout/entity/order'
import OrderItem from './domain/checkout/entity/order_item'
import Customer from './domain/customer/entity/customer'
import Address from './domain/customer/value-object/address'

let customer = new Customer('123', 'Flavio Santos')
const address = new Address('Rua dois', 2, '12345-67890', 'São Paulo')
customer.Address = address
customer.activate()

const item1 = new OrderItem('1', 'item 1', 10, 'p1', 1)
const item2 = new OrderItem('2', 'item 2', 15, 'p2', 2)

const order = new Order('1', '123', [item1, item2])
