import EventDispatcher from '../@shared/event-dispatcher'
import CustomerCreatedEvent from './customer-created.event'
import SendConsoleLogWhenCustomerIsCreatedHandler1 from './handler/send-email-when-customer-is-created.handler1'
import SendConsoleLogWhenCustomerIsCreatedHandler2 from './handler/send-email-when-customer-is-created.handler2'

describe('Customer event test', () => {
  it('should notify the event handler for created customer', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new SendConsoleLogWhenCustomerIsCreatedHandler1()
    const eventHandler2 = new SendConsoleLogWhenCustomerIsCreatedHandler2()

    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    expect(
      eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
    ).toBe(2)

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: '123',
      name: 'Customer 1'
    })

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })
})
