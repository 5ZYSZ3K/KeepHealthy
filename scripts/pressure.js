const tim =  document.getElementById('time') || null;
const pressure =  document.getElementById('pressure2') || null;
const pulse =  document.getElementById('pulse') || null;
const select = document.getElementById('pressure-date');
const measurementsArray = [];
const p1 = document.querySelector('.info-center p:nth-child(2)');
const p2 = document.querySelector('.info-center p:nth-child(3)');
const p3 = document.querySelector('.info-center p:nth-child(4)');
select.addEventListener('change', (e) => {
    measurementsArray.forEach(v => {
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
        db.collection(userId).doc('Cisnienie')
            .onSnapshot(doc => {
                measurementsArray.splice(0, measurementsArray.length)
                const keys = Object.keys(doc.data());
                keys.forEach(key => {
                    const option = document.createElement('option');
                    option.innerText=key;
                    select.appendChild(option);
                    measurementsArray.push({
                        name: key,
                        time: doc.data()[key].godzina,
                        pulse: doc.data()[key].puls,
                        pressure: doc.data()[key].cisnienie
                    })
                })
            })
    }
})
document.getElementById('send').addEventListener('click', function(){
    const pressureCheck = pressure.value.split('/');
    if(pressureCheck.length !== 2 || isNaN(pressureCheck[0]) || isNaN(pressureCheck[1])){
        pressure.value="Niewłaściwa wartość!"
    }
    else {
        let measurementsObject = {};
        measurementsArray.forEach(measure => {
            measurementsObject[measure.name] = {
                godzina: measure.time,
                puls: measure.pulse,
                cisnienie: measure.pressure
            }
        })
        let objName = date;
        if(Object.keys(measurementsObject).includes(date)){
            objName+=","+tim.value;
        }
        measurementsObject[objName] = {
            godzina: tim.value,
            cisnienie: pressure.value,
            puls: pulse.value
        }
        db.collection(userId).doc('Cisnienie').set(measurementsObject);
    }
})