import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'

const customer1 = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Street1', 123, 'Zip', 'City')
)

const customer2 = CustomerFactory.createWithAddress(
  'Jane Doe',
  new Address('Street2', 456, 'Zip2', 'City2')
)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
  }
}

describe('Unit Test for listing Customer use case', () => {
  it('should list a customer', async () => {
    const repository = MockRepository()
    const useCase = new ListCustomerUsecase(repository)

    const output = await useCase.execute()

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.stret).toBe(customer1.address.street)

    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.stret).toBe(customer2.address.street)
  })
})
