import ProductFactory from './product.factory'

describe('Product factory unit test', () => {
  it('should create a product type A', () => {
    const product = ProductFactory.create('a', 'Product A', 1)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product A')
    expect(product.price).toBe(1)
    expect(product.constructor.name).toBe('Product')
  })

  it('should create a product type B', () => {
    const product = ProductFactory.create('b', 'Product B', 5)

    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(10)
    expect(product.constructor.name).toBe('ProductB')
  })

  it('should throw an error when product type is not suppoerted', () => {
    expect(() => ProductFactory.create('c', 'Product C', 2)).toThrow(
      'Invalid product type'
    )
  })
})
