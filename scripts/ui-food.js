const name1 =  document.getElementById('name') || null;
const fdate = document.getElementById('food-d');
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        add();
        add2();
    }
})
function add(){
    let fd = document.getElementsByClassName('food-type');
    db.collection("informacje_o_jedzeniu").get().then(function(food){
        food.forEach(function(food2){
            let option =  document.createElement('option');
            option.innerText=food2.id;
            option.setAttribute('value', food2.id);
            fd[fd.length-1].appendChild(option);
        })
    })    
}
function add2(){
    db.collection(userId).doc('Posilek').collection('Posilek').onSnapshot(function(fo){
        console.log(fo.docChanges);
        fo.docChanges.forEach(function(fo2){
            let option =  document.createElement('option');
            option.innerText=fo2.id;
            option.setAttribute('value', fo2.id);
            fdate.appendChild(option);
        })
} )
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
document.getElementById('send').addEventListener('click', function(){
    const food_type = document.querySelectorAll('.food-type') || null;
    let gram = document.querySelectorAll('.gram') || null;
   food_type.forEach( function(x,key){
    db.collection(userId).doc('Posilek').collection('Posilek').doc(date).collection(name1.value).doc(x.value).set({
        Waga:  gram[key].value
    });
   })
})