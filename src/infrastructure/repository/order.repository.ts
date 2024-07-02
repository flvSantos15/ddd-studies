import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order_item'
import OrderRepositoryInterface from '../../domain/repository/order-repository.interface'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        }))
      },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }

  // async update(entity: Customer): Promise<void> {
  //   await CustomerModel.update(
  //     {
  //       name: entity.name,
  //       street: entity.Address.street,
  //       number: entity.Address.number,
  //       zipcode: entity.Address.zipcode,
  //       city: entity.Address.city,
  //       active: entity.isActive(),
  //       rewardPoints: entity.rewardPoints
  //     },
  //     {
  //       where: {
  //         id: entity.id
  //       }
  //     }
  //   )
  // }

  async find(id: string, customerId: string): Promise<Order> {
    let orderModel
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: {
          model: OrderItemModel
        },
        rejectOnEmpty: true
      })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const orderItems = orderModel.items.map((item) => {
      const orderItem = new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )

      return orderItem
    })

    const order = new Order(id, customerId, orderItems)

    return order
  }

  // async findAll(): Promise<Customer[]> {
  //   const customerModels = await CustomerModel.findAll()

  //   const customers = customerModels.map((customerModels) => {
  //     let customer = new Customer(customerModels.id, customerModels.name)
  //     customer.addRewardPoints(customerModels.rewardPoints)
  //     const address = new Address(
  //       customerModels.street,
  //       customerModels.number,
  //       customerModels.zipcode,
  //       customerModels.city
  //     )
  //     customer.changeAddress(address)

  //     if (customerModels.active) {
  //       customer.activate()
  //     }

  //     return customer
  //   })

  //   return customers
  // }
}
