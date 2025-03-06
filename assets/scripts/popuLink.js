function popupCloseOverlay(){
    let dialog = document.querySelector('.popup')
    dialog.addEventListener('click',function(evt){
    if(evt.target === dialog){
        window['dialog'].close()
    }
    })
}
function createLink(){
    let regs = new  RegExp(selected,'g')
    let item = selected.replace(regs,`<a class="link referral-link clone" href>` + selected + '</a>')
    onSelected.parentElement.parentElement.innerHTML += item
}