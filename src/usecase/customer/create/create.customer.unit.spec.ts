import CreateCustomerUseCase from './create.customer.usecase'

const input = {
  name: 'John',
  address: {
    street: 'Street',
    number: 123,
    city: 'City',
    zip: 'Zip'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test create customer usecase', () => {
  it('should create customer', async () => {
    const customerRepository = MockRepository()
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    const output = await customerCreateUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository)

    input.name = ''

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    )
  })
})
