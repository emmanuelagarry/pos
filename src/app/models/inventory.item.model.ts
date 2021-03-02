export interface InventoryItem {
  _id: string
  name: string
  stock: number
  imgUrl?: string
  price: string
  category: string
  docType: 'inventoryItem'
}
