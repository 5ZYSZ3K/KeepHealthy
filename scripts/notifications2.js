const swiitch =  document.getElementById('swiitch') || null;
const hour1 =  document.getElementById('hour1') || null;
const hour2 =  document.getElementById('hour2') || null;
const frequency =  document.getElementById('frequency') || null;
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
    }
})
document.getElementById('send').addEventListener('click', function(){
    db.collection(userId).doc('Przypomnienia').collection('Wiecej').doc('1').set({
        woda: swiitch.checked,
        godzina_rozpoczecia: hour1.value,
        godzina_zakonczenia: hour2.value,
        co_ile: frequency.value
    });
})