importScripts('/__/firebase/3.8.0/firebase-app.js');
importScripts('/__/firebase/3.8.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

if (!firebase.apps.length) {
    var firebaseConfig = {
        apiKey: "AIzaSyD9zzJRxYMuIytUyp6FSJRroOnkDsoDOGQ",
        authDomain: "keephealthy-b37bb.firebaseapp.com",
        databaseURL: "https://keephealthy-b37bb.firebaseio.com",
        projectId: "keephealthy-b37bb",
        storageBucket: "keephealthy-b37bb.appspot.com",
        messagingSenderId: "288571643327",
        appId: "1:288571643327:web:0643e976859ed2ea647d0a",
        measurementId: "G-M0ZC195KW6"
    };
    firebase.initializeApp(firebaseConfig);
}
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
    console.log(payload);
})