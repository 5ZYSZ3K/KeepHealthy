const tim =  document.getElementById('time') || null;
const pressure =  document.getElementById('pressure2') || null;
const pulse =  document.getElementById('pulse') || null;
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        add();
    }
})
const pdate = document.getElementById('pressure-date');
function add(){
    db.collection(userId).doc('Cisnienie').collection('Cisnienie').get().then(function(pres){
        pres.forEach(function(pr) {
            let option =  document.createElement('option');
                option.innerText=pr.id;
                option.setAttribute('value', pr.id);
                pdate.appendChild(option);
        });
        db.collection(userId).doc('Cisnienie').collection('Cisnienie').doc(pdate.value).onSnapshot(function(get){
            document.getElementById('ho').textContent = get.data().godzina;
            document.getElementById('pres').textContent = get.data().cisnienie;
            document.getElementById('pul').textContent = get.data().puls;
        })
    })
}
pdate.addEventListener('change',function(){
    db.collection(userId).doc('Cisnienie').collection('Cisnienie').doc(pdate.value).onSnapshot(function(get){
        document.getElementById('ho').textContent = get.data().godzina;
        document.getElementById('pres').textContent = get.data().cisnienie;
        document.getElementById('pul').textContent = get.data().puls;
    })
})
document.getElementById('send').addEventListener('click', function(){
    db.collection(userId).doc('Cisnienie').collection('Cisnienie').doc(date).set({
        godzina: tim.value,
        cisnienie: pressure.value,
        puls: pulse.value
    });
})
