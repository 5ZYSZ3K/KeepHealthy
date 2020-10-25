const name1 =  document.getElementById('name') || null;
let productsObject = {};
const select = document.getElementById('food-date');
let dateList = [];
function updateSelectField(){
    db.collection(userId).doc('Posilek').collection(select.value)
        .onSnapshot(snapshot => {
            let caloriesSum = 0;
            let proteinSum = 0;
            let fatSum = 0;
            let carbohydratesSum = 0;
            snapshot.docChanges().forEach(v => {
                Object.values(v.doc.data()).forEach(val => {
                    const data = val;
                    caloriesSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].kalorie);
                    proteinSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].bialko);
                    fatSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].tluszcz);
                    carbohydratesSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].weglowodany);
                });
            })
            db.collection(userId).doc('Woda').get().then(doc => {
                    if(doc.data()[select.value]){
                        doc.data()[select.value].forEach(drink => {
                            caloriesSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].kalorie);
                            proteinSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].bialko);
                            fatSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].tluszcz);
                            carbohydratesSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].weglowodany);
                        })
                    }
                    document.querySelector('#food-field p:nth-child(2)').innerText = "Kalorie: "+Math.round(caloriesSum*100)/100+" kcal";
                    document.querySelector('#food-field p:nth-child(3)').innerText = "Białko: "+Math.round(proteinSum*100)/100+" g";
                    document.querySelector('#food-field p:nth-child(4)').innerText = "Tłuszcz: "+Math.round(fatSum*100)/100+" g";
                    document.querySelector('#food-field p:nth-child(5)').innerText = "Węglowodany: "+Math.round(carbohydratesSum*100)/100+" g";
                })
        })
}
select.addEventListener('change', updateSelectField)
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        add(updateTodayField);
        db.collection(userId).doc('Posilek').get().then(doc => {
            dateList = JSON.parse(doc.data().list);
            dateList.forEach(date => {
                const option = document.createElement('option');
                option.innerText = date;
                select.appendChild(option);
            })
            updateSelectField();
        })
    }
})
function add(f){
    const fd = document.getElementsByClassName('food-type');
    productsObject = {};
    db.collection("informacje").doc('informacje_o_jedzeniu')
        .get().then(doc => {
            productsObject = {...productsObject,...doc.data()};
            let keys = Object.keys(productsObject);
            keys = keys.sort();
            keys.forEach(key => {
                const option =  document.createElement('option');
                option.innerText=key;
                option.setAttribute('value', key);
                fd[fd.length-1].appendChild(option);
            })
            if(f) f();
        })
    db.collection("informacje").doc('informacje_o_napojach')
        .get().then(doc => {
            productsObject = {...productsObject,...doc.data()};
        })
}
document.getElementById('add-ingredient').addEventListener('click', (e) => {
    const div = document.createElement('div');
    const div1 = document.createElement('div');
    div.classList.add('singular-row');
    div1.classList.add('singular-row');
    const span = document.createElement('span');
    span.innerText="Składnik:";
    const select = document.createElement('select');
    select.classList.add('double-row');
    select.className += " food-type";
    select.setAttribute('name', 'food-type');
    div.appendChild(span);
    div.appendChild(select);
    const text = document.createTextNode('Ilość (g): ');
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.classList.add('double-row');
    input.className += " gram";
    div1.appendChild(text);
    div1.appendChild(input);
    document.querySelector('.info-center .regular-row:nth-child(2)').insertBefore(div1, e.target);
    document.querySelector('.info-center .regular-row:nth-child(2)').insertBefore(div, e.target);
    add();
})
function updateTodayField(){
    let todayCaloriesSum = 0;
    let todayProteinSum = 0;
    let todayFatSum = 0;
    let todayCarbohydratesSum = 0;
    const today = new Date();
    db.collection(userId).doc('Posilek').collection(date).get().then(snapshot => {
            snapshot.docChanges().forEach(v => {
                Object.values(v.doc.data()).forEach(val => {
                    const data = val;
                    todayCaloriesSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].kalorie);
                    todayProteinSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].bialko);
                    todayFatSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].tluszcz);
                    todayCarbohydratesSum += parseFloat(data.waga)/100*parseFloat(productsObject[data.nazwa].weglowodany);
                });
            })
            db.collection(userId).doc('Woda').get().then(doc => {
                    if(doc.data()[date]){
                        doc.data()[date].forEach(drink => {
                            todayCaloriesSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].kalorie);
                            todayProteinSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].bialko);
                            todayFatSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].tluszcz);
                            todayCarbohydratesSum += parseFloat(drink.ilosc)*10*parseFloat(productsObject[drink.rodzaj].weglowodany);
                        })
                    }
                    document.querySelector('#today p:nth-child(2)').innerText = "Kalorie: "+Math.round(todayCaloriesSum*100)/100+" kcal";
                    document.querySelector('#today p:nth-child(3)').innerText = "Białko: "+Math.round(todayProteinSum*100)/100+" g";
                    document.querySelector('#today p:nth-child(4)').innerText = "Tłuszcz: "+Math.round(todayFatSum*100)/100+" g";
                    document.querySelector('#today p:nth-child(5)').innerText = "Węglowodany: "+Math.round(todayCarbohydratesSum*100)/100+" g";
                })
        })
}
document.getElementById('send').addEventListener('click', function(){
    const foodType = document.querySelectorAll('.food-type') || null;
    let gram = document.querySelectorAll('.gram') || null;
    const today = new Date();
    if(!(dateList.includes(date))){
        dateList.push(date);
        db.collection(userId).doc('Posilek').set({list: JSON.stringify(dateList)});
    }
    const foodArr = [];
    for (let i=0; i<gram.length; i++){
        foodArr.push({
            nazwa: foodType[i].value,
            waga: gram[i].value
        });
    }
    db.collection(userId).doc('Posilek').collection(date).doc(name1.value).set({...foodArr});
    updateTodayField();
})