const tim =  document.getElementById('time') || null;
const pressure =  document.getElementById('pressure2') || null;
const pulse =  document.getElementById('pulse') || null;
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
    }
})
document.getElementById('send').addEventListener('click', function(){
    db.collection(userId).doc('Cisnienie').collection('Cisnienie').doc(date).set({
        godzina: tim.value,
        cisnienie: pressure.value,
        puls: pulse.value
    });
})