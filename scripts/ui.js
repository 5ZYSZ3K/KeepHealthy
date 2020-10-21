document.querySelector("#hamburger").addEventListener("click", function(){
    if (document.querySelector('span').classList.contains('first2')){
        document.querySelector('.first').classList.remove('first2');
        document.querySelector('.second').classList.remove('second2');
        document.querySelector('.third').classList.remove('third2');
        document.querySelector('#container nav').style.display = "none";
        document.querySelector('#container main').style.display = "block";
    }
    else {
        document.querySelector('.first').classList.add('first2');
        document.querySelector('.second').classList.add('second2');
        document.querySelector('.third').classList.add('third2');
        document.querySelector('#container nav').style.display = "flex";
        document.querySelector('#container main').style.display = "none";
    }
});
window.addEventListener('resize', () => {
    if(window.innerWidth > 1100){
        if (document.querySelector('span').classList.contains('first2')){
            document.querySelector('.first').classList.remove('first2');
            document.querySelector('.second').classList.remove('second2');
            document.querySelector('.third').classList.remove('third2');
        }
        document.querySelector('#container nav').style.display = "flex";
        document.querySelector('#container main').style.display = "block";
    }
    else {
        document.querySelector('#container nav').removeAttribute('style');
        document.querySelector('#container main').removeAttribute('style');
    }
})