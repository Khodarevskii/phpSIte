let selected
function contextMenu(){
    const template = document.querySelector('#context-menu')
    let item = template.content.cloneNode(true)
    let place = document.querySelector('body')
    place.append(item)
    let contextMenuActive = "context-menu--active";
    let elem = document.querySelectorAll(".promo");
    let menu = document.querySelector(".context-menu");
    let menuItems = menu.querySelector(".context-menu__item");
    let onSelected
    function contentMenu(e) {
        e.preventDefault();
        toggleMenu();
        positionMenu(e);
    };
    function blur(event){
    event.target.parentElement.removeEventListener('contextmenu',contentMenu)
    }

    window.onselect = function(event) {
      event.target.parentElement.removeEventListener('blur',blur)
      if (document.querySelector('.supports-drag-drop') && document.querySelector('.supports-drag-drop').closest('style') ){
        console.log
        return
      }
      event.target.parentElement.addEventListener('contextmenu',contentMenu)
      event.target.addEventListener('blur',blur)
      return onSelected = event.target
    }
    document.addEventListener('click',function(){
      if (document.querySelector('.context-menu--active')){
        toggleMenu();
      }
    })

    function toggleMenu() {
      menu.classList.toggle(contextMenuActive)
    }

    function positionMenu(event) {
      menu.style.left = event.pageX + 'px'
      menu.style.top =  event.pageY + 'px';
    }
    function menuItem(evt){
      let elem = evt.target.textContent.toLowerCase().replace(/^\s+|\s+$/g, '') 
      .replace(/\s+/g, ' ') 
      .replace(/\n\s*\n/g, '\n')
       selected = getSelection()
       let selectedToString = selected.toString()
      switch(elem){
        case 'копировать':
          evt.preventDefault()
          navigator.clipboard.writeText(selectedToString)
          break
        case 'вставить':
          evt.preventDefault()
          let  reg = new RegExp(selectedToString, 'g');
          navigator.clipboard.readText()
          .then(text => {
            if(selectedToString == ''){
              onSelected.value = onSelected.value.slice(0,onSelected.selectionStart) + text + onSelected.value.slice(onSelected.selectionStart)
              return
            }
            onSelected.value = onSelected.value.replace(reg, text) 
          })
          .catch(err => {
            alert('Нужно согласить  чтобы можно было вставлять текст через контекстное меню если вы не хотите этого можете использовать  ctr+v для вставки');
          });
          break
        case 'сделать ссылкой':
          evt.preventDefault()
          let regular = new RegExp( `(?:\\S+\\s+)?\\S*${selectedToString}*(?:\\s+\\S+)?`,'gm');
          let object = {}
          object.beforeWord = regular.exec(onSelected.value.slice(onSelected.selectionStart))
          object.placeLink = onSelected
          window['dialog'].showModal()
          wordLink[selectedToString] = object
          return selected
      }
    }
    menu.addEventListener('click',menuItem)
  }
document.addEventListener('DOMContentLoaded', function(){
 
  contextMenu()
});
