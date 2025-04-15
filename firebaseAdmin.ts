import { initializeApp,getApps, App, getApp, cert, ServiceAccount } from "firebase-admin/app";
import{ getFirestore } from "firebase-admin/firestore";


//const serviceKey = require("./serviceKey.json");
import serviceKey from "./service_key.json";


let app: App;

if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey as ServiceAccount),
    });
}else {
    app = getApp();
}
const admindb = getFirestore(app);

export { app as adminApp, admindb };
