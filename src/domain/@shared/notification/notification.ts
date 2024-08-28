export type NotificationError = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationError[] = []

  addError(error: NotificationError) {
    this.errors.push(error)
  }

  messages(context?: string): string {
    return this.errors
      .filter((error) => (context ? error.context === context : error))
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}
