let wordLink ={}
let buttonPhp = document.querySelector('#triggerPhp')
function textInput(item) {
    item.setAttribute('data-value', item.value)
};

function go(page){
    console.log(page)
    let strTeg = {
    p: page.querySelectorAll('p'),
    h:  page.querySelectorAll('h1, h2, h3, h4, h5, h6'),
}
let span = page.querySelectorAll('span')
let a = page.querySelectorAll('a')

a.forEach(function(i){
    i.addEventListener('click',stopLink ); 
    if (!i.querySelector('input')){

    if(i.parentElement.tagName == 'P'||i.parentElement.tagName == 'H'){
        let links =  i.parentElement.querySelectorAll('.link')
        let parentElement = i.parentElement
        parentElement.classList.add('link-view')
        let textBlock =parentElement.textContent
        let place =  parentElement.parentElement
        for(const y of links){
            let textLink  = y.textContent.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
            .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
            .replace(/\n\s*\n/g, '\n')
            let object = {}
            object.placeLink = parentElement
            wordLink[textLink] = object
            y.classList.add('clone')
            let labelLink = document.createElement('label')
            let labelHref =  document.createElement('label')
            labelLink.innerHTML = '<span class="label__link">Имя ссылки</span>'
            labelHref.innerHTML = '<span class="label__link">Адрес ссылки</span>'
            labelLink.classList.add('label')
            labelHref.classList.add('label')
            let linkRefferal = document.createElement('input')
            let linkRefferalHref = document.createElement('input')
            linkRefferal.setAttribute("value",`${y.textContent.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
            .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
            .replace(/\n\s*\n/g, '\n')}`);   // Удаляем лишние пустые строки
            y.setAttribute('name',y.textContent)
            linkRefferal.classList.add('text-changer')
            linkRefferal.classList.add('link-input')
            linkRefferalHref.classList.add('text-changer')
            linkRefferalHref.classList.add('href')
            linkRefferalHref.setAttribute("value",y.getAttribute('href'))
            y.textContent = ''
            labelLink.appendChild(linkRefferal)
            labelHref.appendChild(linkRefferalHref)
            y.appendChild(labelLink)
            y.appendChild(labelHref)
            place.appendChild(y.cloneNode(true)) 
            y.remove()
        }
        console.log(wordLink)
        parentElement.textContent = textBlock
        place.addEventListener('click',stopLink)
        place.addEventListener("dragstart", function(evt){
            evt.preventDefault();
          });
    }
  
    if(!i.querySelector('span')){
    
        let linkInput = document.createElement('input')
        linkInput.setAttribute("value",`${i.textContent.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
            .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
            .replace(/\n\s*\n/g, '\n')}`);   // Удаляем лишние пустые строки
        
            linkInput.classList.add('text-changer')
        i.textContent = ''
        i.appendChild(linkInput)
    }
}
})

span.forEach(function(i){
    if (!i.querySelector('input')){
    let spanInput = document.createElement('input')
    spanInput.setAttribute("value",`${i.textContent.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
        .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
        .replace(/\n\s*\n/g, '\n')}`);   // Удаляем лишние пустые строки
    spanInput.classList.add('text-changer')
    i.textContent = ''
    if(i.parentElement.tagName == 'A'){
        let linkRefferalHref = document.createElement('input')
        linkRefferalHref.classList.add('text-changer')
        linkRefferalHref.classList.add('href')
        linkRefferalHref.setAttribute("value",i.parentElement.getAttribute('href'))
        i.appendChild(spanInput)
        i.appendChild(linkRefferalHref)
        return
    }
    i.appendChild(spanInput)
    }
})

Object.keys(strTeg).forEach(function(item){
    for (const i of strTeg[item]){
       if (!i.querySelector('input')){
       let input = document.createElement('textarea')
       input.textContent = i.textContent.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
       .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
       .replace(/\n\s*\n/g, '\n');  // Удаляем лишние пустые строки
       input.classList.add('text-changer')
        input.setAttribute('data-value', input.value)
        i.textContent = ''
        i.appendChild(input)
       }
    }
    
})

function stopLink(e){
    e.preventDefault();

}
let textarea = document.querySelectorAll('textarea')
let  input = document.querySelectorAll('input')

for(let i of textarea){
    i.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = `${this.scrollHeight}px`;
        textInput(i)
      });
      i.style.height = 'auto';
      i.style.height = `${i.scrollHeight}px`;
      i.addEventListener("dragstart", function(evt){
        evt.preventDefault();
      });
      if (i.parentElement.classList.contains('link-view')){

        i.addEventListener('change',function(){
            let link = i.parentElement.parentElement.querySelectorAll('a')
            let firstLinkData = link[0].querySelector('input').getAttribute('data-value')
            let secondLinkData = link[1].querySelector('input').getAttribute('data-value')

            function errAdd(firstWord,secondWord){
                const regex = new RegExp(`\\${firstWord}`,'g');
                const regexSecond = new RegExp(`\\${secondWord}`,'g');
                console.log(regexSecond.exec(i.getAttribute('data-value')))
                console.log(regexSecond.test(i.getAttribute('data-value')))
                if ( !regex.test(i.getAttribute('data-value'))  || !regexSecond.test(i.getAttribute('data-value'))){
                    if(!i.parentElement.querySelector('.err')){
                        buttonPhp.setAttribute('disabled','true')
                        let err = document.createElement('div')
                        err.classList.add('err')
                        err.textContent = 'Вы удалили одну из ссылок '
                        i.parentElement.classList.add('err')
                        i.parentElement.appendChild(err)
                    }else{
                        return
                    }
                }else{
                    if(i.parentElement.querySelector('.err')){
                        buttonPhp.removeAttribute('disabled')
                        i.parentElement.classList.remove('err')
                        err = i.parentElement.querySelector('div')
                        err.remove()
                    }
                }
            }
            errAdd(firstLinkData,secondLinkData)
        })
      }
}
for(let i of input){
    i.addEventListener('input', function () {
        textInput(i)
        if(i.classList.contains('href')){
            if(i.parentElement.tagName == 'A'){
                i.parentElement.setAttribute('href',i.getAttribute('data-value')) 
            }else{
                i.parentElement.parentElement.setAttribute('href',i.getAttribute('data-value')) 
            }
        
        }
    })
    textInput(i)
    if(i.classList.contains('link-input')){
    i.addEventListener('change',function(){
        console.log(i)
        let placeLink = document.querySelector('.link-view')
        let placeLinkData = placeLink.querySelector('.text-changer').getAttribute('data-value')
        console.log( placeLinkData)
            if (!placeLinkData.includes(i.getAttribute('data-value'))){
                console.log(1)
                if(!placeLink.querySelector('.err')){
                    buttonPhp.setAttribute('disabled','true')
                    let err = document.createElement('div')
                    err.classList.add('err')
                    err.textContent = 'Вы сменили название у одной из  ссылок вставте ее в текст'
                    placeLink.classList.add('err')
                    placeLink.appendChild(err)
                }else{
                    return
                }
            }else{
                if(placeLink.querySelector('.err')){
                    placeLink.classList.remove('err')
                    buttonPhp.removeAttribute('disabled')
                    err = placeLink.querySelector('div')
                    err.remove()

                }
        }
    })
    }
      i.addEventListener("dragstart", function(evt){
        evt.preventDefault();
      });
}


}
page.addEventListener('load',go(page))
footer.addEventListener('load',go(footer))
