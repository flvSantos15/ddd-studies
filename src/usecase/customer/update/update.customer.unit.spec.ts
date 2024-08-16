import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import CustomerUpdateUseCase from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('Street', 123, 'Zip', 'City')
)

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 456,
    zip: 'Zip Updated',
    city: 'City Updated'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test update customer', () => {
  it('should update customer', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUsecase = new CustomerUpdateUseCase(customerRepository)

    const output = await customerUpdateUsecase.execute(input)

    expect(output).toEqual(input)
  })
})
