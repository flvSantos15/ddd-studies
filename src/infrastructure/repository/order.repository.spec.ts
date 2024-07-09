import { Sequelize } from 'sequelize-typescript'
import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order_item'
import Customer from '../../domain/entity/customer'
import Address from '../../domain/entity/address'
import Product from '../../domain/entity/product'
import CustomerModel from '../db/sequelize/model/customer.model'
import CustomerRepository from './customer.repository'
import ProductModel from '../db/sequelize/model/product.model'
import ProductRepository from './product.repository'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'
import OrderRepository from './order.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel
    ])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const ordemItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('123', '123', [ordemItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: '123',
          product_id: '123'
        }
      ]
    })
  })

  // TODO: not tested yet
  it('should update a order', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('987', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product1 = new Product('987', 'Product 1', 10)
    const product2 = new Product('654', 'Product 2', 14)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem1 = new OrderItem(
      '135',
      product1.name,
      product1.price,
      product1.id,
      2
    )

    const order = new Order('135', customer.id, [orderItem1])

    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          order_id: order.id,
          product_id: product1.id
        }
      ]
    })

    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2
    )

    order.addItems(orderItem2)

    await orderRepository.update(order)

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel2.items.length).toBe(2)
    expect(orderModel2.total).toBe(order.total())
  })

  it('should throw an error when customer is not found', async () => {
    const orderRepository = new OrderRepository()

    expect(async () => {
      await orderRepository.findOne('456ABC', '123')
    }).rejects.toThrow('Order not found')
  })

  it('should find a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('135', 'Customer 1')
    const address = new Address('street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('129', 'Product 1', 10)
    await productRepository.create(product)

    const ordemItem = new OrderItem(
      '357',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('357', customer.id, [ordemItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    const foundOrder = await orderRepository.findOne(order.id, customer.id)

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: foundOrder.total(),
      items: foundOrder.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          order_id: order.id,
          quantity: item.quantity,
          product_id: product.id
        }
      })
    })
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('789', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product1 = new Product('246', 'Product 1', 10)
    const product2 = new Product('249', 'Product 2', 20)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const orderItem1 = new OrderItem(
      '579',
      product1.name,
      product1.price,
      product1.id,
      2
    )
    const orderItem2 = new OrderItem(
      '569',
      product2.name,
      product2.price,
      product2.id,
      3
    )

    const order1 = new Order('247', customer.id, [orderItem1])
    const order2 = new Order('248', customer.id, [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    await orderRepository.create(order2)

    const ordersModel = await orderRepository.findAll()

    expect(ordersModel).toHaveLength(5)
    expect(ordersModel).toContainEqual(order1)
  })
})
