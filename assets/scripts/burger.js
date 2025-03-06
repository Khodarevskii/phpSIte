const burger = document.querySelector('.burger__menu')
const menu = document.querySelector('.menu') 
burger.addEventListener('click',function(){
    menu.classList.toggle('menu_active')
    burger.classList.toggle('burger_active')
})