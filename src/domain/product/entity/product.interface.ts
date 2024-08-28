import Entity from '../../@shared/entity/entity.abstract'

export default interface ProductInterface {
  get id(): string
  get name(): string
  get price(): number
}
