import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import UpdateProductUseCase from './update.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'

const input = {
  id: '123',
  name: 'Product 1',
  price: 22
}

describe('Unit test update product', () => {
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

  it('should update a product', async () => {
    const repository = new ProductRepository()
    const useCase = new UpdateProductUseCase(repository)

    await repository.create(new Product('123', 'Product 1', 15))

    const output = await useCase.execute(input)

    expect(output).toEqual(input)
  })
})
