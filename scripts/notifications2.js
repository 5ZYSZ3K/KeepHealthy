let sinceInput = document.querySelector('.double-row:nth-child(1)');
let toInput = document.querySelector('.double-row:nth-child(2)');
let frequency = document.querySelector('.shorter-input');
let check = document.getElementById('check');
document.querySelector('.send-form').addEventListener('click', () => {
    console.log(check.checked)
    if(check){
        console.log(sinceInput.value, toInput.value, frequency)
        if(sinceInput.value && toInput.value && frequency.value){
            console.log('1')
            messaging.requestPermission()
                .then(() => messaging.getToken())
                .then((token) => {
                    db.collection(userLogged.uid).doc('Przypomnienia').set({token});
                    console.log('jest');
                }).then(() => {
                    db.collection(userLogged.uid).doc('Przypomnienia').collection('Wiecej').doc('1').set({
                        woda: true,
                        godzina_rozpoczecia: sinceInput.value,
                        godzina_zakonczenia: toInput.value,
                        co_ile: frequency.value
                    })
                    console.log('jest2');
                })
        }
        
    }
    else {
        db.collection(userLogged.uid).doc('Przypomnienia').collection('Wiecej').doc('1').delete();
    }
})
auth.onAuthStateChanged((user) => {
    if (user){
        userLogged = user;
        db.collection(userLogged.uid).doc('Przypomnienia').collection('Wiecej').doc('1')
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