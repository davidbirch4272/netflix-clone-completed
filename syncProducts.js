//const admin = require("firebase-admin");
//const Stripe = require("stripe");
//require('dotenv').config(); 


//const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//});

//const db = admin.firestore();


//const stripe = new Stripe(process.env.STRIPE_TEST_KEY);

//async fun ction syncProducts() {
//  try {

//    const products = await stripe.products.list({ active: true });

//    for (const product of products.data) {

//      await db.collection("products").doc(product.id).set({
//        name: product.name,
//        description: product.description || "",
//        active: product.active,
//        images: product.images || [],
//        role: null,
//      });


 //     const prices = await stripe.prices.list({ product: product.id, active: true });
 //     for (const price of prices.data) {

 //       await db
 //         .collection("products")
 //         .doc(product.id)
 //         .collection("prices")
 //         .doc(price.id)
 //         .set({
 //           unit_amount: price.unit_amount,
 //           currency: price.currency,
 //           interval: price.recurring?.interval || null,
 //           type: price.type,
 //         });
 //     }
 //   }

   
 // } catch (err) {
 //   console.error("❌ Error syncing products:", err);
 // }
//}

//syncProducts();
