export interface ProductLine {
    line_code: number,
    name: string,
    product: Product[]
}

export interface Product {
    line_code: number,
    product_code: string,
    name: string,
    price: number,
    image: string
}