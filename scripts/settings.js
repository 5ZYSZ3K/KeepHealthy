const height =  document.getElementById('height') || null;
const weight =  document.getElementById('weight') || null;
const age =  document.getElementById('age') || null;
const gender = document.querySelectorAll('.gender') || null;
let gen = '';
let userId = '';
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
        db.collection(userId).doc('Dane_ogolne').onSnapshot((doc) => {
            height.value = doc.data().wzrost;
            weight.value = doc.data().waga;
            age.value = doc.data().wiek;
            if(doc.data().plec === 'M') gender[0].checked = true;
            else if (doc.data().plec === 'K') gender[1].checked = true;
        })
    }
})
document.getElementById('send').addEventListener('click', function(){
    if(gender[0].checked) gen = 'M';
    else if(gender[1].checked) gen = 'K';
    db.collection(userId).doc('Dane_ogolne').set({
        wzrost: height.value,
        waga: weight.value,
        wiek: age.value,
        plec: gen
    })
})
