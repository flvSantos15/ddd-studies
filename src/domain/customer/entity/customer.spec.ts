import Address from '../value-object/address'
import Customer from './customer'

describe('Customer unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John')
    }).toThrow('customer: Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '')
    }).toThrow('customer: Name is required')
  })

  it('should throw error when name and id are empty', () => {
    expect(() => {
      let customer = new Customer('', '')
    }).toThrow('customer: Id is required, customer: Name is required')
  })

  it('should change name', () => {
    const customer = new Customer('123', 'John')

    customer.changeName('Jane')

    expect(customer.name).toBe('Jane')
  })

  it('should add address', () => {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)

    expect(customer.address.street).toBe(address.street)
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 123, '1234-245', 'São paulo')
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should desactivate customer', () => {
    const customer = new Customer('123', 'Customer 1')

    customer.desactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should throw error when address is undefined when you activate a customer.', () => {
    expect(() => {
      const customer = new Customer('123', 'Customer 1')

      customer.activate()
    }).toThrow('Address is mandatory to activate a customer.')
  })

  it('should add reward points.', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1')
      expect(customer.rewardPoints).toBe(0)

      customer.addRewardPoints(10)
      expect(customer.rewardPoints).toBe(10)

      customer.addRewardPoints(10)
      expect(customer.rewardPoints).toBe(20)
    })
  })
})
