import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// const serviceAccount = require('/Users/fuad_ibrahimov/projects/ionic/sodyah/functions/testsadyah-firebase-adminsdk-fj5a3-8cbdd287e1.json')

admin.initializeApp()
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// })

const db = admin.firestore
const store = admin.storage()
interface Cart {
  name: string
  count: number
}

interface Combo {
  name: string
  price: number
}

interface Dish {
  id?: string
  observableId?: number
  name: string
  category: string
  combo: Combo[]
  time?: number
}

export const getImageList = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    // store
    //   .bucket('')
    //   .getFiles()
    //   .then(files => files)
    const storeRef = store.app.database().ref()

    storeRef
      .once('value')
      .then(result => {
        console.log(result.val)
        res.send(result.val)
      })
      .catch(eee => {
        console.log(eee)
        res.send(eee)
      })
  }

  //   res.json({ stuf: 'idey' })
})

export const checkOut = functions.firestore
  .document('checkout/{checkoutId}')
  .onCreate((change, context) => {
    const newData = change.data()
    change.ref
      .update({
        timeStamp: db.FieldValue.serverTimestamp(),
      })
      .catch(e => console.error(e))
    if (newData) {
      const cart: Dish[] = newData.cart

      const modifiedCart: Cart[] = cart
        .map(items => items.combo.map(chow => chow.name))
        .reduce((acc, val) => acc.concat(val), [])
        .map(value => ({ name: value, count: 1 }))

      const morfedCart = modifiedCart.reduce(
        (pv, cv) => {
          if (pv.map(stuff => stuff.name === cv.name)) {
            const dupIndex = pv.findIndex(item => item.name === cv.name)
            if (dupIndex !== -1) {
              pv[dupIndex].count = pv[dupIndex].count + 1
              return pv
            }
            return [...pv, cv]
          }
          return [...pv, cv]
        },
        [{ name: '', count: 1 }]
      )

      morfedCart.forEach(async item => {
        if (item.name !== '') {
          const increment = db.FieldValue.increment(-item.count)
          const docRef = db()
            .collection('products')
            .doc(item.name)
          await docRef
            .update({
              portion: increment,
            })
            .catch(e => console.log(e))
        }
      })

      // const modifiedCart: Cart[]

      // const cart: [] = newData.cart;

      // const modifiedCart: Cart[] = cart.map(item => (
      //     { name: item, count: 1 }
      // ))
      // const morfedCart = modifiedCart.reduce((pv, cv) => {
      //     if (pv.map(stuff => stuff.name === cv.name)) {

      //         const dupIndex = pv.findIndex(item => item.name === cv.name)
      //         if (dupIndex !== -1) {
      //             pv[dupIndex].count = pv[dupIndex].count + 1
      //             return pv
      //         }
      //         return [...pv, cv]

      //     }
      //     return [...pv, cv]
      // }, [{ name: '', count: 1 }]);

      // morfedCart.forEach(async item => {
      //     if (item.name !== '') {
      //         const increment = db.FieldValue.increment(-item.count)
      //         const docRef = db().collection('products').doc(item.name)
      //         await docRef.update({portion : increment}).catch(e => console.log(e))
      //         }
      //      });
    }
  })

// modifiedCart.reduce((pv, cv) => pv.map(stuff => stuff.name)
//             .includes(cv.name) ?  dupIndex = pv.filter((item, index) => pv.indexOf(item.name) === cv.name)
//             [] : [], [{ name: '', count: 1 }])
