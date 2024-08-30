// Toda entidade tem um id, pq ela é única
// Toda entidade sempre precisa se validar.

import Entity from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import CustomerValidatorFactory from '../factory/customer.validator.factory'
import Address from '../value-object/address'

export default class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  // get id(): string {
  //   return this.id
  // }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get address(): Address {
    return this._address
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
    this._active = true
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer.')
    }
    this._active = true
  }

  desactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  set Address(address: Address) {
    this._address = address
  }
}
