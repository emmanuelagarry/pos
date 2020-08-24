export interface MenuItem {
  _id: string
  name: string
  category: string
  price: number
  combo: [string]
  docType: 'menuItem'
  imageUrl?: string
  available: boolean
  observableId: any
}
