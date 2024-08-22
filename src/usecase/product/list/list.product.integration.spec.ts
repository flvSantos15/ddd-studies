import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import Product from '../../../domain/product/entity/product'
import ListProductUsecase from './list.product.usecase'

describe('Test find product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new ListProductUsecase(productRepository)

    const product1 = new Product('123', 'Product 1', 15)
    const product2 = new Product('234', 'Product 2', 25)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const output = [
      { id: '123', name: 'Product 1', price: 15 },
      { id: '234', name: 'Product 2', price: 25 }
    ]

    const result = await usecase.execute({})

    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toEqual(output[0].id)
    expect(result.products[0].name).toEqual(output[0].name)

    expect(result.products[1].id).toEqual(output[1].id)
    expect(result.products[1].name).toEqual(output[1].name)
  })
})
