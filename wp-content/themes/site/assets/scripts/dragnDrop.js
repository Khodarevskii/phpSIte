const place = document.querySelector('#prise')
const mainContent = place.querySelector('.promo__wrapper')
const mainItem = mainContent.querySelectorAll('.promo__item')
const image = document.querySelectorAll('.promo__item-image')
const link  = document.querySelectorAll('.promo__item-button')
function draggableAdd(element){
  for (const item of element){
    item.draggable = true
    item.classList.add(`draggable`);
  }
}

draggableAdd(mainItem)

for (const item of link){
item.draggable = false
}
for (const item of image){
  item.draggable = false
}
function dragon(){
mainContent.addEventListener(`dragstart`, (evt) => {
  if (evt.target.tagName == 'TEXTAREA'){
    return
  }
  if (evt.target.tagName == 'INPUT'){
    return
  }
  if (evt.target.tagName == 'IMG'){
    return
  }
    evt.target.classList.add(`selected`);
  })
  
  mainContent.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
  });
  const getNextElement = (cursorPosition, currentElement) => {
    // Получаем объект с размерами и координатами
    const currentElementCoord = currentElement.getBoundingClientRect();
    // Находим вертикальную координату центра текущего элемента
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
    // Если курсор выше центра элемента, возвращаем текущий элемент
    // В ином случае — следующий DOM-элемент
    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
  
    return nextElement;
  };


  mainContent.addEventListener(`dragover`, (evt) => {
    // Разрешаем сбрасывать элементы в эту область
    evt.preventDefault();
  
    const activeElement = mainContent.querySelector(`.selected`);
    // Находим элемент, над которым в данный момент находится курсор
    const currentElement = evt.target.parentElement;
    // Проверяем, что событие сработало:
    // 1. не на том элементе, который мы перемещаем,
    // 2. именно на элементе списка
    const isMoveable = activeElement !== currentElement ;
    // Если нет, прерываем выполнение функции
    if (!isMoveable) {
      return;
    }
  
    // Находим элемент, перед которым будем вставлять
    const nextElement = (currentElement === activeElement.nextElementSibling) ?
        currentElement.nextElementSibling :
        currentElement;
    // Вставляем activeElement перед nextElement
    mainContent.insertBefore(activeElement, nextElement);
  });
}
dragon()