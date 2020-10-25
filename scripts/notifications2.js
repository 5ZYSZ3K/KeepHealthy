let sinceInput = document.querySelector('.double-row:nth-child(1)');
let toInput = document.querySelector('.double-row:nth-child(2)');
let frequency = document.querySelector('.shorter-input');
let check = document.getElementById('check');
document.querySelector('.send-form').addEventListener('click', () => {
    if(check){
        if(sinceInput.value && toInput.value && frequency.value){
            messaging.requestPermission()
                .then(() => messaging.getToken())
                .then((token) => {
                    db.collection('Przypomnienia').doc(userLogged.uid).set({token});
                }).then(() => {
                    db.collection('Przypomnienia').doc(userLogged.uid).collection('Wiecej').doc('1').set({
                        woda: true,
                        godzina_rozpoczecia: sinceInput.value,
                        godzina_zakonczenia: toInput.value,
                        co_ile: frequency.value
                    })
                })
        }
        
    }
    else {
        db.collection('Przypomnienia').doc(userLogged.uid).collection('Wiecej').doc('1').delete();
    }
})
auth.onAuthStateChanged((user) => {
    if (user){
        userLogged = user;
        db.collection('Przypomnienia').doc(userLogged.uid).collection('Wiecej').doc('1')
            .onSnapshot((doc) => {
                if(doc.data()){
                    sinceInput.value = doc.data().godzina_rozpoczecia;
                    toInput.value = doc.data().godzina_zakonczenia;
                    frequency.value = doc.data().co_ile;
                    check.checked = true;
                }
            })
    }
})