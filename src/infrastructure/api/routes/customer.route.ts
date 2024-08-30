import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer.repository'
import ListCustomerUsecase from '../../../usecase/customer/list/list.customer.usecase'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecase = new CreateCustomerUseCase(repository)

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city
      }
    }

    const output = await usecase.execute(customerDto)
    res.send(output)
  } catch (e) {
    res.status(500).send(e)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecase = new ListCustomerUsecase(repository)

  try {
    const output = await usecase.execute({})
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})