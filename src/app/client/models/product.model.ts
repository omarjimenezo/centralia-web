export interface ProductLine {
    id: number,
    name: string
}

export interface Product {
    id: number,
    category_id: number,
    sku: string,
    description: string,
    price: number,
    image: string
}