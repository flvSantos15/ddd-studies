export interface InputFindCustomerDto {
  id: string
}

export interface OutputFindCustomerDto {
  id: string
  name: string
  address: {
    street: string
    city: string
    number: string
    zip: string
  }
}
