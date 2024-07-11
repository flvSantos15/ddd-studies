import EventDispatcher from '../../@shared/event/event-dispatcher'
import CustomerChangeAddressEvent from './customer-change-address.event'
import CustomerCreatedEvent from './customer-created.event'
import SendConsoleLogWhenCustomerChangeAddressHandler from './handler/send-email-when-customer-address-is-changed.handler'

describe('Customer event test', () => {
  it('should notify the event handler for created customer', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendConsoleLogWhenCustomerChangeAddressHandler()

    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('CustomerChangeAddressEvent', eventHandler)

    expect(
      eventDispatcher.getEventHandlers['CustomerChangeAddressEvent'].length
    ).toBe(1)

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: '123',
      name: 'John Doe'
    })

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      id: customerCreatedEvent.eventData.id,
      name: customerCreatedEvent.eventData.name,
      address: {
        street: 'Street 1',
        number: 1,
        zipcode: 'Zipcode 1',
        city: 'City 1'
      }
    })

    eventDispatcher.notify(customerChangeAddressEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})
