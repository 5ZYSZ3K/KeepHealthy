const tim =  document.getElementById('time') || null;
const pressure =  document.getElementById('pressure2') || null;
const pulse =  document.getElementById('pulse') || null;
const select = document.getElementById('pressure-date');
const measurementsArray = [];
const p1 = document.querySelector('.info-center p:nth-child(2)');
const p2 = document.querySelector('.info-center p:nth-child(3)');
const p3 = document.querySelector('.info-center p:nth-child(4)');
select.addEventListener('change', (e) => {
    console.log(e);
    measurementsArray.forEach(v => {
        console.log(select.value, v.name)
        if(select.value === v.name){
            p1.innerText = "Godzina: "+v.time;
            p2.innerText = "Puls: "+v.pulse;
            p3.innerText = "Ciśnienie: "+v.pressure;
        }
    })
})
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        db.collection(userId).doc('Cisnienie').collection('Cisnienie')
            .onSnapshot(doc => {
                doc.docChanges().forEach(v => {
                    if(v.type='added'){
                        const option = document.createElement('option');
                        option.innerText=v.doc.id;
                        select.appendChild(option);
                        measurementsArray.push({
                            name: v.doc.id,
                            time: v.doc.data().godzina,
                            pulse: v.doc.data().puls,
                            pressure: v.doc.data().cisnienie
                        })
                    }
                })
            })
    }
})
document.getElementById('send').addEventListener('click', function(){
    db.collection(userId).doc('Cisnienie').collection('Cisnienie').doc(date).set({
        godzina: tim.value,
        cisnienie: pressure.value,
        puls: pulse.value
    });
})