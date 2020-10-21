if (!navigator.serviceWorker.controller){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('/sw.js')
        .then((data) => {
            console.log(data)
        })
        .catch((e) => {
            console.log(e)
        })
    }
}