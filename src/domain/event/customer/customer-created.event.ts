import EventInterface from '../@shared/event.interface'

interface ICreatedEvent {
  id: string
  name: string
}

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOcurred: Date
  eventData: ICreatedEvent

  constructor(eventData: ICreatedEvent) {
    this.dataTimeOcurred = new Date()
    this.eventData = eventData
  }

  get customer() {
    return this.eventData
  }
}
