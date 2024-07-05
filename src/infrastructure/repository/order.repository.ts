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

  async update(entity: Order): Promise<void> {
    const entityItems = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity
    }))

    const entityItemsIDs = entity.items.map((item) => item.id)

    const foundItems = await OrderItemModel.findAll({
      where: { order_id: entity.id }
    })

    const foundItemsIDs = foundItems.map((item) => item.id)

    const itemsToCreate = entityItems.filter(
      (item) => !foundItemsIDs.includes(item.id)
    )

    const itemsToRemove = foundItems.filter(
      (item) => !entityItemsIDs.includes(item.id)
    )

    for (const item of itemsToCreate) {
      await OrderItemModel.create({ ...item, order_id: entity.id })
    }

    for (const item of itemsToRemove) {
      await OrderItemModel.destroy({
        where: {
          id: item.id
        }
      })
    }

    await OrderModel.update(
      { total: entity.total() },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

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
      throw new Error('Order not found')
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

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: {
        model: OrderItemModel
      }
    })

    const orders = orderModels.map((orderModels) => {
      const orderItems = orderModels.items.map((item) => {
        const orderItem = new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )

        return orderItem
      })

      let order = new Order(orderModels.id, orderModels.customer_id, orderItems)

      return order
    })

    return orders
  }
}
