import Order from '../entity/order'
import RepositoryInterface from '../../@shared/repository/repository-interface'

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {
  findOne(id: string, customerId: string): Promise<Order>
}
