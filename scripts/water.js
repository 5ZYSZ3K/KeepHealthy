const type =  document.getElementById('type') || null;
const quantity =  document.getElementById('quantity') || null;
const sugar =  document.getElementById('sugar') || null;
const wdate = document.getElementById('water-date');
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        add();
    }
})
function add(){
    db.collection(userId).doc('Woda').collection('Woda').get().then(function(water){
        water.forEach(function(wat) {
            let option =  document.createElement('option');
                option.innerText=wat.id;
                option.setAttribute('value', wat.id);
                wdate.appendChild(option);
        });
        db.collection(userId).doc('Woda').collection('Woda').doc(wdate.value).onSnapshot(function(get){
            document.getElementById('lit').textContent = get.data().ilosc;
            document.getElementById('gram').textContent = get.data().cukier;
        })
        db.collection(userId).doc('Woda').collection('Woda').doc(date).onSnapshot(function(get){
            document.getElementById('tlit').textContent = get.data().ilosc;
            document.getElementById('tgram').textContent = get.data().cukier;
        })
    })
}
wdate.addEventListener('change',function(){
    db.collection(userId).doc('Woda').collection('Woda').doc(wdate.value).onSnapshot(function(get){
        document.getElementById('lit').textContent = get.data().ilosc;
        document.getElementById('gram').textContent = get.data().cukier;
    })
})
document.getElementById('send').addEventListener('click', function(){
    db.collection(userId).doc('Woda').collection('Woda').doc(date).set({
        rodzaj: type.value,
        ilosc: quantity.value,
        cukier: sugar.value
    });
})