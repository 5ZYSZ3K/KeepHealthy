const signupForm = document.getElementById('signup') || null;
const signinForm = document.getElementById('signin') || null;
db.enablePersistence();
let userLogged = null;
let userRegistered = false;
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
if(signupForm){
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        userRegistered = true;
        const mail = signupForm.createMail.value;
        signupForm.createMail.value = 'Proszę czekać';
        if(signupForm.createPass.value === signupForm.repeated.value){
            auth.createUserWithEmailAndPassword(mail, signupForm.createPass.value).then(cred => {
                window.location = '/pages/settings.html';
            }).catch(() => {
                signupForm.createMail.value = "Błąd rejestracji";
            })
        }
        else {
            signupForm.createMail.value = "hasła nie są identyczne";
        }
    });
}
if(signinForm){
    signinForm.addEventListener('submit', e => {
        e.preventDefault();
        const mail = signinForm.mail.value;
        signinForm.mail.value = 'Proszę czekać';
        auth.signInWithEmailAndPassword(mail, signinForm.pass.value).then(cred => {
            window.location = '/pages/settings.html';
        }).catch(() => {
            signupForm.createMail.value = "Błąd logowania";
        })
    });
}
auth.onAuthStateChanged(function(user){
    if(userRegistered){
        window.location = '/pages/settings.html';
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
        auth.signOut();
    })
}