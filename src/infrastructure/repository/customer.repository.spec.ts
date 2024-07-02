import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../db/sequelize/model/customer.model'
import CustomerRepository from './customer.repository'
import Customer from '../../domain/entity/customer'
import Address from '../../domain/entity/address'

describe('Customer repository test', () => {
  let sequelize: Sequelize

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '123' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customerModel = await CustomerModel.findOne({ where: { id: '456' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '456',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    })

    customer.changeName('Customer 2')
    await customerRepository.update(customer)

    const customerModel2 = await CustomerModel.findOne({ where: { id: '456' } })

    expect(customerModel2.toJSON()).toStrictEqual({
      id: '456',
      name: 'Customer 2',
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city
    })
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('124', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customerResult = await customerRepository.find(customer.id)

    expect(customer).toStrictEqual(customerResult)
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()

    expect(async () => {
      await customerRepository.find('456ABC')
    }).rejects.toThrow('Customer not found')
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('789', 'Customer 1')
    const address1 = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer1.changeAddress(address1)
    customer1.addRewardPoints(10)
    customer1.activate()

    const customer2 = new Customer('457', 'Customer 2')
    const address2 = new Address('Street 2', 2, 'Zipcode 2', 'City 2')
    customer2.changeAddress(address2)
    customer2.addRewardPoints(20)

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const customers = await customerRepository.findAll()

    expect(customers).toHaveLength(5)
    expect(customers).toContainEqual(customer1)
    expect(customers).toContainEqual(customer2)
  })
})
