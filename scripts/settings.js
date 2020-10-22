const height =  document.getElementById('height') || null;
const weight =  document.getElementById('weight') || null;
const age =  document.getElementById('age') || null;
const gender = document.querySelectorAll('.gender') || null;
let gen = '';
let userId = '';
auth.onAuthStateChanged(function(user){
    if (user){
        userId = user.uid;
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
