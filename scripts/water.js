const quantity =  document.getElementById('quantity') || null;
const sugar =  document.getElementById('sugar') || null;
const wdate = document.getElementById('water-date');
const select = document.getElementById('drink-type');
const waterArray = [];
db.collection('informacje').doc('informacje_o_napojach')
    .onSnapshot(doc => {
        select.innerHTML = "";
        const keys = Object.keys(doc.data());
        keys.forEach(key => {
            const option = document.createElement('option');
            option.innerText = key;
            select.appendChild(option);
        })
    })
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        db.collection(userId).doc('Woda')
            .onSnapshot(doc => {
                let todaySugarSum = 0;
                let todayWaterSum = 0;
                let sugarSum = 0;
                let waterSum = 0;
                if (doc.data() != null){
                    waterArray.splice(0, waterArray.length);
                    const keys = Object.keys(doc.data());
                    keys.forEach(key => {
                        let option =  document.createElement('option');
                        option.innerText=key;
                        wdate.appendChild(option);
                        waterArray.push({
                            name: key,
                            content: doc.data()[key]
                        })
                    });
                    waterArray.forEach(day => {
                        if(day.name == wdate.value){
                            day.content.forEach(drink => {
                                waterSum += parseFloat(drink.ilosc);
                                sugarSum += parseFloat(drink.cukier);
                            })
                        }
                        if(day.name== date){
                            day.content.forEach(drink => {
                                todayWaterSum += parseFloat(drink.ilosc);
                                todaySugarSum += parseFloat(drink.cukier);
                            })
                        }
                    })
                }
                document.getElementById('lit').innerText = waterSum;
                document.getElementById('gram').innerText = sugarSum;
                document.getElementById('tlit').innerText = todayWaterSum;
                document.getElementById('tgram').innerText = todaySugarSum;
            })
    }
})
wdate.addEventListener('change',function(){
    let sugarSum = 0;
    let waterSum = 0;
    waterArray.forEach(day => {
        if(day.name == wdate.value){
            day.content.forEach(drink => {
                waterSum += parseFloat(drink.ilosc);
                sugarSum += parseFloat(drink.cukier);
            })
        }
    })
    document.getElementById('lit').innerText = waterSum;
    document.getElementById('gram').innerText = sugarSum;
})
document.getElementById('send').addEventListener('click', function(){
    let waterObject = {};
    waterArray.forEach(day => {
        waterObject[day.name] = day.content;
    })
    if(waterObject[date]){
        waterObject[date].push({
            rodzaj: select.value,
            ilosc: quantity.value,
            cukier: sugar.value
        });
    }
    else {
        waterObject[date] = [{
            rodzaj: select.value,
            ilosc: quantity.value,
            cukier: sugar.value
        }];
    }
    db.collection(userId).doc('Woda').set(waterObject);
})