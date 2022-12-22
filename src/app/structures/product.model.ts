export interface ProductJson {
  id: number
  name: string
  image: string
  price: number
  description: string
}

export class Product{
  constructor(
    private _id: number,
    private _name: string,
    private _image: string,
    private _price: number,
    private _description: string,
  ) {}

  static fromJSON(json: ProductJson): Product{
    const product = new Product(
      json.id,
      json.name,
      json.image,
      json.price,
      json.description
    )
    return product
  }

  toJSON(): ProductJson{
    return <ProductJson>{
      id: this.id,
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description
    }
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get image(): string {
    return this._image
  }

  get price(): number {
    return this._price
  }

  get description(): string {
    return this._description
  }
}
