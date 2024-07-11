import EventHandlerInterface from '../../../@shared/event/event-handle.interface'
import CustomerChangeAddressEvent from '../customer-change-address.event'

export default class SendConsoleLogWhenCustomerChangeAddressHandler1
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    // o ID, Nome, bem como os dados do endereço devem ser passados ao evento.
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    )
  }
}
