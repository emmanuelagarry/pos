import { Constants } from './../constants'
import { SooyahOrder } from './../models/sooyah.order'
import PouchDB from 'pouchdb'
import { Category } from '../models/category.model'
import { InventoryItem } from '../models/inventory.item.model'
import { MenuItem } from '../models/menu.item.model'
import { Injectable } from '@angular/core'
PouchDB.plugin(require('pouchdb-find'))

interface Location {
  _id: string
  docType: string
  name: string
}
@Injectable({ providedIn: 'root' })
export class SooyahBistroPouchDb {
  private db = new PouchDB('sooyah')

  location: string

  change = this.db.changes({ since: 'now', live: true, include_docs: true })
  constructor() {
    // const designDoc = {
    //   _id: '_design/my_index',
    //   views: {
    //     my_index: {
    //       map: (doc) => {
    //          this.db.emit(doc.docType)
    //       }
    //     },
    //   },
    // }
    // this.db.put(designDoc)
    // this.db.destroy().then(() => {
    //   alert('destroyed')
    // }).catch(() => {
    //   alert('error')
    // })
  }

  createDesignDoc(docType: string, mapFunction) {
    const ddoc = {
      _id: '_design/' + docType,
      views: {},
    }
    ddoc.views[docType] = { map: mapFunction.toString() }
    return ddoc
  }

  async getCategoriesPouch() {
    return this.db.allDocs<Category>({
      include_docs: true,
      startkey: `${Constants.category}`,
      endkey: `${Constants.category}\ufff0`,
    })
  }

  getInventoryItemsPouch() {
    return this.db.allDocs<InventoryItem>({
      include_docs: true,
      startkey: `${Constants.inventoryItem}`,
      endkey: `${Constants.inventoryItem}\ufff0`,
    })
  }

  async putInventoryItemPouch(item: InventoryItem) {
    try {
      const date = new Date()
      const doc: InventoryItem = {
        _id: `${Constants.inventoryItem}${item.name}`,
        docType: `${Constants.inventoryItem}`,
        ...item,
      }
      const doc2 = {
        _id: `stock${date}`,
        docType: 'Stock Created',
        name: item.name,
        date: `${date}`,
        amount: item.stock,
      }
      this.db.put(doc)
      this.db.put(doc2)
    } catch (error) {
      console.log(error)
    }
  }

  putCategoryItemPouch(item: Category) {
    const doc: Category = {
      _id: `category${item.name}`,
      name: item.name,
      docType: 'category',
    }
    this.db.put(doc).catch(err => console.log(err))
  }

  putMenuItemsPouch(item: MenuItem) {
    const doc: MenuItem = {
      _id: `menuItem${item.name}`,
      docType: 'menuItem',
      ...item,
    }
    this.db.put(doc).catch(err => console.log(err))

    item._id = item.name
    this.db.put(item).catch(err => console.log(err))
  }

  getMenuItemsPouch() {
    return this.db.allDocs<MenuItem>({
      include_docs: true,
      startkey: Constants.menuItem,
      endkey: `${Constants.menuItem}\ufff0`,
    })
  }

  async decrementMenuItems(id: string, decrementBy: number) {
    const doc = await this.db.get<InventoryItem>(id)
    const newStock = doc.stock - decrementBy
    this.db.put({
      ...doc,
      stock: newStock,
    })
  }

  async putOrderPouch(
    item,
    payment: string,
    delivery: string,
    timestamp: Date
  ) {
    const doc: SooyahOrder = {
      _id: `order${timestamp}`,
      cart: item,
      docType: 'order',
      payment,
      delivery,
      timestamp,
    }
    try {
      await this.db.put(doc)
    } catch (error) {
      console.log({ error })
    }
  }

  getOrderPouch() {
    return this.db.allDocs<SooyahOrder>({
      include_docs: true,
      startkey: 'order',
      endkey: 'order\ufff0',
    })
  }

  async editStockPouch(name: string, newAmount: number) {
    const db = this.db
    const date = new Date()

    const doc = {
      _id: `stock${name}${date}`,
      docType: 'Stock Added',
      name,
      date: `${date}`,
      amount: newAmount,
    }
    try {
      await this.db.put(doc)
      const document = await this.db.get<InventoryItem>(`inventoryItem${name}`)
      const newStock = document.stock + newAmount
      db.put({
        ...document,
        stock: newStock,
      })
        .then(docume => docume)
        .catch(ee => console.log(ee))
    } catch (err) {
      return console.log(err)
    }
  }

  deleteInventoryItemPouch(name: string) {
    const db = this.db
    return this.db.get(`inventoryItem${name}`).then(doc => {
      return db.remove(doc._id, doc._rev)
    })
  }

  deleteCategoryPouch(name: string) {
    const db = this.db
    return this.db.get(`category${name}`).then(doc => {
      return db.remove(doc._id, doc._rev)
    })
  }

  deleteMenuPouch(name: string) {
    const db = this.db
    return this.db.get(`menuItem${name}`).then(doc => {
      return db.remove(doc._id, doc._rev)
    })
  }

  async checklocactionPouch() {
    try {
      const doc = await this.db.get<Location>('location')

      if (doc.name) {
        this.location = doc.name
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async setLocation(name: string) {
    const doc: Location = {
      _id: 'location',
      docType: 'location',
      name,
    }

    this.location = doc.name
    try {
      return this.db.put(doc)
    } catch (err) {
      console.log(err)
      return
    }
  }

  getExpensePouch() {
    return this.db.allDocs<{
      _id: string
      docType: string
      name: string
      date: string
      amount: number
    }>({
      include_docs: true,
      startkey: 'stock',
      endkey: 'stock\ufff0',
    })
  }
}
