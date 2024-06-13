import Address from './address'
import Customer from './customer'

describe('Customer unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John')
    }).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '')
    }).toThrow('Name is required')
  })

  it('should change name', () => {
    const customer = new Customer('123', 'John')

    customer.changeName('Jane')

    expect(customer.name).toBe('Jane')
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
})
