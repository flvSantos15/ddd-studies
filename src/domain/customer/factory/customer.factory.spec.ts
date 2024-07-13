import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    let customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    let customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBe(address)
  })
})
