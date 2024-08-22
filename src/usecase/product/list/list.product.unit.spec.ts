import Product from '../../../domain/product/entity/product'
import ListProductUsecase from './list.product.usecase'

const product1 = new Product('123', 'Product1', 10)

const product2 = new Product('456', 'Product2', 20)

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test listing products', () => {
  it('should find products', async () => {
    const repository = MockRepository()
    const usecase = new ListProductUsecase(repository)

    const output = await usecase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)

    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
  })
})
