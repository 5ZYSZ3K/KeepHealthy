Array.from(document.getElementsByClassName('change')).map(el => {
    el.addEventListener('click', () => {
        if(document.getElementById('login').style.display === "block" || !document.getElementById('login').style.display){
            document.querySelector('#login').style.display = "none";
            document.querySelector('#register').style.display = "block";
        }
        else{
            document.querySelector('#login').style.display = "block";
            document.querySelector('#register').style.display = "none";
        }
    })
});
window.addEventListener('resize', () => {
    if(window.innerWidth > 1100){
        document.querySelector('#login').style.display = "block";
        document.querySelector('#main').style.display = "block";
    }
    else {
        document.querySelector('#login').removeAttribute('style');
        document.querySelector('#login').removeAttribute('style');
    }
})