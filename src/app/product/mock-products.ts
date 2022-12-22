import { Product } from '../structures/product.model'

const JsonProducts = [
  {
    id: 1,
    name: 'testName',
    image: 'testImage',
    price: 29,
    description: 'testDescription'
  }
]

export const PRODUCTS: Product[] = JsonProducts.map(Product.fromJSON)
