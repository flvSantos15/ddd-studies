import EventInterface from '../../@shared/event/event.interface'

interface IChangeAddress {
  id: string
  name: string
  address: {
    street: string
    number: number
    zipcode: string
    city: string
  }
}

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOcurred: Date
  eventData: IChangeAddress

  constructor(eventData: IChangeAddress) {
    this.dataTimeOcurred = new Date()
    this.eventData = eventData
  }
}
