import { Sequelize } from 'sequelize-typescript'
import CreateProductUsecase from './create.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'

const input = {
  name: 'Product 1',
  price: 10
}

describe('Unit test create product usecase', () => {
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

  it('should create a product', async () => {
    const repository = new ProductRepository()
    const useCase = new CreateProductUsecase(repository)

    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })
})
