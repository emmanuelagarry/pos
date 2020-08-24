import { MenuItem } from './menu.item.model'
export interface SooyahOrder {
  _id?: string
  price?: number
  payment?: string
  delivery?: string
  menuList?: string[]
  cart: MenuItem[]
  timestamp: any
  location?: string
  docType: 'order'
}
