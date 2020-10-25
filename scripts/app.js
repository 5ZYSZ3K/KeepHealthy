if (!navigator.serviceWorker.controller){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('/sw.js');
    }
}