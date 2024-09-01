import { app, sequelize } from '../express'
import request from 'supertest'

describe('e2e test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          number: 123,
          zip: '12345',
          city: 'City'
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('John')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345')
    expect(response.body.address.city).toBe('City')
  })

  it('should not create a customer', async () => {
    const resposne = await request(app).post('/customer').send({
      name: 'John'
    })

    expect(resposne.status).toBe(500)
  })

  it('should list all customers', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          number: 123,
          zip: '12345',
          city: 'USA'
        }
      })

    expect(response.status).toBe(200)

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Jane',
        address: {
          street: 'Street2',
          number: 456,
          zip: '67890',
          city: 'Bangladesh'
        }
      })

    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/customer').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    const customer = listResponse.body.customers[0]
    expect(customer.name).toBe('John')
    expect(customer.address.street).toBe('Street')

    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('Jane')
    expect(customer2.address.street).toBe('Street2')

    const listResponseXML = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send()

    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    )
  })
})
