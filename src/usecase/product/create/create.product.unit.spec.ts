import CreateProductUsecase from './create.product.usecase'

const input = {
  name: 'Product 1',
  price: 10
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test create product usecase', () => {
  it('should create a product', async () => {
    const repository = MockRepository()
    const useCase = new CreateProductUsecase(repository)

    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })
})
