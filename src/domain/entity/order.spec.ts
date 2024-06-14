import Order from './order'
import OrderItem from './order_item'

describe('Customer unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', [])
    }).toThrow('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '', [])
    }).toThrow('CustomerId is required')
  })

  it('should throw error when items are empty', () => {
    expect(() => {
      let order = new Order('123', '123', [])
    }).toThrow('Items are required')
  })

  it('should calculate total', () => {
    const item = new OrderItem('i1', 'Item 1', 100, 'p1', 2)
    const item2 = new OrderItem('i2', 'Item 2', 150, 'p2', 2)
    const order = new Order('o1', 'c1', [item, item2])

    const total = order.total()

    expect(total).toBe(500)
  })

  it('should throw error if the item quantity is less or equal zero.', () => {    
    expect(() => {
      const item = new OrderItem('i1', 'Item 1', 100, 'p1', 0)
      const order = new Order('o1', 'c1', [item])
    }).toThrow('Quantity must be greater than zero')
  })
})
