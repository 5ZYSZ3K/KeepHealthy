const signupForm = document.getElementById('signup') || null;
const signinForm = document.getElementById('signin') || null;
let userLogged = null;
let userRegistered = false;
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
if(signupForm){
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        userRegistered = true;

        if(signupForm.createPass.value === signupForm.repeated.value){
            auth.createUserWithEmailAndPassword(signupForm.createMail.value, signupForm.createPass.value).then(cred => {
                console.log(JSON.parse(JSON.stringify(auth)));
                console.log(auth);
            })
        }
    });
}
if(signinForm){
    signinForm.addEventListener('submit', e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(signinForm.mail.value, signinForm.pass.value).then(cred => {
            console.log(auth);
        })
    });
}
auth.onAuthStateChanged(function(user){
    if(userRegistered){
        let userId = firebase.auth().currentUser.uid;
        db.collection(userId).doc('Dane_ogolne').set({
            wzrost: "",
            waga: "",
            wiek: "",
            plec: ""
        });
        db.collection(userId).doc('Woda').collection('Woda').doc(date).set({
            rodzaj: "",
            ilosc: "",
            cukier: ""
        });
        db.collection(userId).doc('Posilek').collection('Posilek').doc(date).set({
            nazwa: "",
            skladniki: ""
        });
        db.collection(userId).doc('Cisnienie').collection('Cisnienie').doc(date).set({
            godzina: "",
            cisnienie: "",
            puls: ""
        });
        db.collection(userId).doc('Przypomnienia').collection('Zwykle').doc('1').set({
            nazwa: "",
            godzina: ""
        });
        db.collection(userId).doc('Przypomnienia').collection('Wiecej').doc('1').set({
            woda: false,
            ilosc_dziennie: "",
            godzina_rozpoczecia: "",
            godzina_zakonczenia: "",
            co_ile: ""
        }).then( () => {
            window.location = '/pages/settings.html';
        })
    }else if (user && (window.location.pathname === '/' || window.location.pathname === '/index.html')){
        window.location = '/pages/settings.html';
    }
    else if (!(user) && window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        window.location = '/index.html';
    }
});
const logOut = document.getElementById('logout') || null;
if(logOut){
    logOut.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log('user signed out')
        })
        .catch(err => {
            console.log(err);
        })
    })
}