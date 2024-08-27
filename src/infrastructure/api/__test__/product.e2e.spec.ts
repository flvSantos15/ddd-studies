import { app, sequelize } from '../express'
import request from 'supertest'

describe('e2e test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Notebook',
      price: 1200
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Notebook')
    expect(response.body.price).toBe(1200)
  })

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Monitor'
    })

    expect(response.status).toBe(500)
  })

  it('should list all products', async () => {
    const response = await request(app).post('/product').send({
      name: 'Mouse',
      price: 150
    })

    expect(response.status).toBe(200)

    const response2 = await request(app).post('/product').send({
      name: 'Headset',
      price: 120
    })

    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/product').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)
    const product = listResponse.body.products[0]
    expect(product.name).toBe('Mouse')
    expect(product.price).toBe(150)

    const product2 = listResponse.body.products[1]
    expect(product2.name).toBe('Headset')
    expect(product2.price).toBe(120)
  })
})
