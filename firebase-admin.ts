import { initializeApp, getApps, App, getApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

import serviceKey from './firebase_service_key.json'

let app: App

if (getApps().length == 0) {
  app = initializeApp({
    credential: cert(serviceKey as ServiceAccount),
  })
} else {
  app = getApp()
}

const adminDB = getFirestore(app)

export { app as adminApp, adminDB }
