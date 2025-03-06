let text = document.querySelector('.email')
function copy(event){
    event.preventDefault();
    let result = text.innerHTML
    navigator.clipboard.writeText(result)
    window.alert('Email-адрес скопирован.')
}
text.addEventListener('click',copy)