import { promises as fs } from 'fs'
import path from 'path'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  createdAt: string
}

const productsFilePath = path.join(process.cwd(), 'data', 'products.json')

// Initialize products data
const initializeProducts = async () => {
  try {
    await fs.access(path.join(process.cwd(), 'data'))
  } catch {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
  }

  try {
    await fs.access(productsFilePath)
  } catch {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
        price: 299.99,
        imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Smart Watch',
        description: 'Advanced fitness tracker with heart rate monitoring and GPS capabilities.',
        price: 199.99,
        imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Wireless Earbuds',
        description: 'Compact wireless earbuds with crystal clear sound and long battery life.',
        price: 89.99,
        imageUrl: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=500',
        createdAt: new Date().toISOString(),
      },
    ]
    await fs.writeFile(productsFilePath, JSON.stringify(initialProducts, null, 2))
  }
}

export const getProducts = async (): Promise<Product[]> => {
  await initializeProducts()
  const data = await fs.readFile(productsFilePath, 'utf8')
  return JSON.parse(data)
}

export const getProduct = async (id: string): Promise<Product | null> => {
  const products = await getProducts()
  return products.find(product => product.id === id) || null
}

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  const products = await getProducts()
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  }
  products.push(newProduct)
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2))
  return newProduct
}