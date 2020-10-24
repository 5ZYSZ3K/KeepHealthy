document.getElementById('add-notify').addEventListener('click', () => {
    if(document.getElementById('hour').value){
        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then((token) => {
                db.collection('Przypomnienia').doc(userLogged.uid).set({token});
            }).then(() => {
                db.collection('Przypomnienia').doc(userLogged.uid).collection('Zwykle').add({
                    godzina: document.getElementById('hour').value,
                    nazwa: document.getElementById('name').value
                })
            })
    }
})
auth.onAuthStateChanged((user) => {
    if (user){
        userLogged = user;
        db.collection('Przypomnienia').doc(user.uid).collection('Zwykle')
            .onSnapshot((doc) => {
                doc.docChanges().forEach(v => {
                    if(v.type === 'added'){
                        const div = document.createElement('div');
                        div.classList.add('regular-row');
                        div.innerText="Nazwa: "+v.doc.data().nazwa+", godzina: "+v.doc.data().godzina;
                        document.querySelector('#notify-list').appendChild(div);
                        const button = document.createElement('button');
                        button.classList.add('button-inline');
                        button.innerText="Usuń";
                        button.addEventListener('click', () => {
                            button.remove();
                            div.remove();
                            db.collection(userLogged.uid).doc('Przypomnienia').collection('Zwykle').doc(v.doc.id).delete();
                        })
                        document.querySelector('#notify-list').appendChild(button);
                    }
                })
            })
    }
})