import express, { Request, Response } from 'express'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import CreateProductUsecase from '../../../usecase/product/create/create.product.usecase'
import ListProductUsecase from '../../../usecase/product/list/list.product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new CreateProductUsecase(repository)

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price
    }

    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (e) {
    res.status(500).send(e)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new ListProductUsecase(repository)

  try {
    const output = await usecase.execute({})
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
