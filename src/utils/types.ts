export interface Product{
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    dicountedPrice?:number
    rating: number
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}