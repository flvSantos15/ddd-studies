// Toda entidade tem um id, pq ela é única
// Toda entidade sempre precisa se validar.

import Address from './address'

export default class Customer {
  _id: string
  _name: string = ''
  _address!: Address
  _active: boolean = false

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  get name(): string {
    return this._name
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
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

  set Address(address: Address) {
    this._address = address
  }
}
