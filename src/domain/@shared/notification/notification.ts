export type NotificationErrorProps = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors
  }

  messages(context?: string): string {
    return this.errors
      .filter((error) => (context ? error.context === context : error))
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}
