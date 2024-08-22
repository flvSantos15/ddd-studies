import Product from '../../../domain/product/entity/product'
import FindProductUsecase from './find.product.usecase'

const product = new Product('123', 'Product', 10)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test finding product', () => {
  it('should find a product', async () => {
    const repository = MockRepository()
    const usecase = new FindProductUsecase(repository)

    const input = {
      id: '123'
    }

    const output = {
      id: '123',
      name: 'Product',
      price: 10
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})
