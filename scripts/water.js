const type =  document.getElementById('type') || null;
const quantity =  document.getElementById('quantity') || null;
const sugar =  document.getElementById('sugar') || null;
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
    }
})
document.getElementById('send').addEventListener('click', function(){
    db.collection(userId).doc('Woda').collection('Woda').doc(date).set({
        rodzaj: type.value,
        ilosc: quantity.value,
        cukier: sugar.value
    });
})