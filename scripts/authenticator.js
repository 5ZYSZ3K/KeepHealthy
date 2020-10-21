const signupForm = document.getElementById('signup') || null;
const signinForm = document.getElementById('signin') || null;
let userLogged = null;
if(signupForm){
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
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
    if (user){
        userLogged = user;
    }
    if (user && (window.location.pathname === '/' || window.location.pathname === '/index.html')){
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