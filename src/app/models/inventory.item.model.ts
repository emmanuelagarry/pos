export interface InventoryItem {
  _id: string
  name: string
  stock: number
  imgUrl?: string
  docType: 'inventoryItem'
}
