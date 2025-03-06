let clients = document.querySelector('.client');
let prise = document.querySelector('#prise')
let clientSlider = document.querySelector('.client__slider')
let clientSliderChild = clientSlider.querySelectorAll('div')
let imageClientSlider =  clientSlider.querySelectorAll('.client__slider-item ')
let card = document.querySelectorAll('article')
let url = window.location.href


function imageChanger(event){

    if(event){
       
       event.preventDefault();
       
       const button = $(this);
      
       const customUploader = wp.media({
           title: 'Выберите изображение плз',
           library : {
               // uploadedTo : wp.media.view.settings.post.id, // если для метобокса и хотим прилепить к текущему посту
               type : 'image'
           },
           button: {
               text: 'Выбрать изображение' // текст кнопки, по умолчанию "Вставить в запись"
           },
           multiple: false
       });
   
       // добавляем событие выбора изображения
       customUploader.on('select', function() {
   
           const image = customUploader.state().get('selection').first().toJSON();
           event.target.setAttribute('src',image.url)
           button.parent().prev().attr( 'src', image.url );
           button.prev().val( image.id );
           let imageName = /[^/]+(?=\/$|$)/.exec(image.url)
           console.log(image.url)
           $.post("", { action: 'go', image: '' +  image.url,imageName: ''+ imageName }, function() {
               console.log('go')
           });
       });
           // и открываем модальное окно с выбором изображения
   
           customUploader.open();
   
   /*
    * удаляем значение произвольного поля
    * если быть точным, то мы просто удаляем value у <input type="hidden">
    */
   $('.remove_image_button').click(function( event){
   
       event.preventDefault();
   
       if ( true == confirm( "Уверены?" ) ) {
           const src = $(this).parent().prev().data('src');
           $(this).parent().prev().attr('src', src);
           $(this).prev().prev().val('');
       }
   });
    }
   }

let remove = function(evt){
    evt.target.parentElement.remove()
    if(evt.target.parentElement.classList.contains('client__slider-item')){
        let sliderChild = clientSlider.querySelectorAll('.client__slider-image')
        let sliderParsing =''
        for (let i = 0;i < sliderChild.length   ; i++){
            sliderParsing += `
                                <div class="client__slider-item">
                                ${sliderChild[i].outerHTML}
                                </div>
                                `
        }
        clientSlider.innerHTML = ''
        clientSlider.innerHTML = sliderParsing
        let imageClientSlider =  clientSlider.querySelectorAll('.client__slider-item ')
        for(let i of imageClientSlider){
            createRemoveButton(i)
        }
        let removeButton = document.querySelectorAll('.client-remove-button')
        for (let i of removeButton){
            i.addEventListener('click',remove)
        }
        clientSlider.classList.remove('slick-initialized','slick-slider')
        slider()
        $('.image').off()
        $('.image').click(imageChanger)
    }
}
function createAddButton(element){
    const clientButton = document.createElement('img')
    clientButton.src = `${url}wp-content/themes/azs-energo/assets/images/plus-circle-svgrepo-com.svg`
    clientButton.classList.add('client-add-button')
    element.append(clientButton)
}
function createRemoveButton(element){
    const clientButton = document.createElement('img')
    clientButton.src =  `${url}wp-content/themes/azs-energo/assets/images/minus-circle-svgrepo-com.svg`
    clientButton.classList.add('client-remove-button')
    element.append(clientButton)
}

for(let i of card){
    createRemoveButton(i)
}

for(let i of imageClientSlider){
    createRemoveButton(i)
}
let removeButton = document.querySelectorAll('.client-remove-button')
for (let i of removeButton){
    i.addEventListener('click',remove)
}
createAddButton(clients)
createAddButton(prise)

let clientsButton = clients.querySelector('.client-add-button')
let priseButton  = prise.querySelector('.client-add-button')
clientsButton.addEventListener('click',addElementSlider)

function addElementSlider(){
    let template  = document.querySelector('#slider__template')
    let item = template.content.cloneNode(true)
    let sliderChild = clientSlider.querySelectorAll('.client__slider-image')
    let sliderParsing =''
    for (let i = 0;i < sliderChild.length   ; i++){
        sliderParsing += `
                            <div class="client__slider-item">
                            ${sliderChild[i].outerHTML}
                            </div>
                            `
    }
    clientSlider.innerHTML = ''
    clientSlider.innerHTML = sliderParsing
    clientSlider.insertBefore(item,clientSlider.firstChild)
    let imageClientSlider =  clientSlider.querySelectorAll('.client__slider-item ')
    for(let i of imageClientSlider){
        createRemoveButton(i)
    }
    let removeButton = document.querySelectorAll('.client-remove-button')
    for (let i of removeButton){
        i.addEventListener('click',remove)
    }
    clientSlider.classList.remove('slick-initialized','slick-slider')
    slider()
    $('.image').off()
    $('.image').click(imageChanger)
}

function addElementPromo(elem){
    const template = document.querySelector('#promo__template')
    let item = template.content.cloneNode(true)
    let place = elem.querySelector('.promo__wrapper')
    if (elem == prise){
        item.querySelector('article').setAttribute('draggable','false')
    }
    place.insertBefore(item,place.firstChild)
    let card = document.querySelectorAll('article')
        const mainContent = prise.querySelector('.promo__wrapper')
        const mainItem = mainContent.querySelectorAll('.promo__item')
        console.log(place.firstChild)
        draggableAdd(mainItem)

    for(let i of card){
        createRemoveButton(i)
    }
    let removeButton = document.querySelectorAll('.client-remove-button')
    for (let i of removeButton){
        i.addEventListener('click',remove)
    }
    go(page)
    $('.image').off()
    $('.image').click(imageChanger)
    elementShow()
}


priseButton.addEventListener('click',function (){addElementPromo(prise)})