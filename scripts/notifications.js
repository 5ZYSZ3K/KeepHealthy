const time =  document.getElementById('time') || null;
const nam =  document.getElementById('name') || null;
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
    }
})
document.getElementById('send').addEventListener('click', function(){
    let today2 = new Date();
    let time2 = today2.getTime();
    time2 = 'a'+time2;
    db.collection(userId).doc('Przypomnienia').collection('Zwykle').doc(time2).set({
        nazwa: nam.value,
        godzina: time.value
    });
})