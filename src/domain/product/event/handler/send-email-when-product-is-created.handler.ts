import EventHandlerInterface from '../../../@shared/event/event-handle.interface'
import ProductCreatedEvent from '../product-created.event'

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email to .....')
  }
}
