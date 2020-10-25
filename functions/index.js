const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
let timeoutObject = {}
exports.sendNotifications = functions.firestore.document('Przypomnienia/{notify}')
    .onWrite((change, context) => {
        if(!change.after.data()) return;
        console.info(change.after.data());
        const payload = {
            notification: {
                title: change.after.data().nazwa,
                body: "Przypomnienie na życzenie",
                icon: 'https://keephealthy-b37bb.web.app/images/icons/icon-72x72.png',
                click_action: 'https://keephealthy-b37bb.web.app/'
            }
        }
        return admin.messaging().sendToDevice([change.after.data().token], payload).then(result => {
            console.log("Notification sent!");
            return null;
        });
    })