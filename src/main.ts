import Address from './domain/entity/address'
import Customer from './domain/entity/customer'
import Order from './domain/entity/order'
import OrderItem from './domain/entity/order_item'

let customer = new Customer('123', 'Flavio Santos')
const address = new Address('Rua dois', 2, '12345-67890', 'São Paulo')
customer.Address = address
customer.activate()

const item1 = new OrderItem('1', 'item 1', 10, 'p1', 1)
const item2 = new OrderItem('2', 'item 2', 15, 'p2', 2)

const order = new Order('1', '123', [item1, item2])
