let page = document.querySelector('.main')
let footer = document.querySelector('.footer')
function copy(){
    text.preventDefault();
    let result = text.innerHTML
    navigator.clipboard.writeText(result)
    window.alert('Email-адрес скопирован.')
}

function stopLink(e){
    e.preventDefault();
}
function gos(page){
    let strTeg = {
    p: page.querySelectorAll('p'),
    h:  page.querySelectorAll('h1, h2, h3, h4, h5, h6'),
}
let show = document.querySelectorAll('.element-show')
for(const i of show){
    i.classList.remove('element-show')
}
let draggable = document.querySelectorAll('.draggable')
for(const i of draggable){
    i.classList.remove('draggable')
}
let span = page.querySelectorAll('span')

Object.keys(strTeg).forEach(function(item){
    for (const i of strTeg[item]){
       let input = i.querySelector('.text-changer')
       let inputText = $(input).attr('data-value')
       i.textContent = inputText.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
       .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
       .replace(/\n\s*\n/g, '\n');  // Удаляем лишние пустые строки
    }
})
let clones = document.querySelectorAll('.clone')



span.forEach(function(i){
    if(i.classList.contains('label__link')){
        i.remove()
        return
    }
    let spanInput = i.querySelector('input')
    let spanInputText = $(spanInput).attr('data-value')
   
    i.textContent =  spanInputText.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
    .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
    .replace(/\n\s*\n/g, '\n');  // Удаляем лишние пустые строки
    spanInput.remove()
})
let a = page.querySelectorAll('a')
Object.keys(wordLink).forEach(function(item){
    if(page === footer){
        return
     }
    let link 
    let place = wordLink[item].placeLink
    for(let i of clones){
        if(i.getAttribute('name').replace(/^\s+|\s+$/g, '') == item){
             link = i
        }
    }
    
    let linkItem = link.querySelector('.text-changer')
    let linkData = linkItem.getAttribute('data-value')

     place.innerHTML = place.innerHTML.replace(linkData,`<a class="link referral-link" href = '${link.getAttribute("href")}'> ${linkData} </a>`)

   
    });
for(let  i of clones){
    i.remove()
}
a.forEach(function(i){
    i.removeEventListener('click',stopLink); 
    if(!i.querySelector('span')){
        let linkInput = i.querySelector('input')
        let linkInputText = $(linkInput).attr('data-value')
        i.textContent =  linkInputText.replace(/^\s+|\s+$/g, '')  // Удаляем пробелы в начале и конце
        .replace(/\s+/g, ' ')  // Заменяем все последовательные пробелы одним пробелом
        .replace(/\n\s*\n/g, '\n');  // Удаляем лишние пустые строки
        linkInput.remove()
    }
})

let removeButton = document.querySelectorAll('.client-remove-button')
let addButton = document.querySelectorAll('.client-add-button')

for(let i of removeButton){
    i.remove()
}
for(let i of addButton){
    i.remove()
}
let imageAll = page.querySelectorAll('img')
if( page.querySelector('video')){
    let video = page.querySelector('video')
    let src = /\/assets*(.*?)$/.exec(video.getAttribute('src'))
        if(src !== null){
            video.removeAttribute('src')
            video.setAttribute('src',`<?php echo bloginfo('template_url');?>${src[0]}`)
        }
    }

for(i of imageAll){
    let src = /\/assets*(.*?)$/.exec(i.getAttribute('src'))
    let uploadsName =  /[^/]+(?=\/$|$)/.exec(i.getAttribute('src'))
        if(src !== null){
            i.removeAttribute('src')
            i.setAttribute('src',`<?php echo bloginfo('template_url');?>${src[0]}`)
        }else{
            i.removeAttribute('src')
            i.setAttribute('src',`<?php echo bloginfo('template_url');?>/assets/images/${uploadsName}`)
        }
}
}


$('#triggerPhp').click(() => {
    let slider = document.querySelector('.client__slider')
    let sliderChild = slider.querySelectorAll('.client__slider-image')
    for(i of sliderChild){
        let src = /\/assets*(.*?)$/.exec(i.getAttribute('src'))
        let uploadsName =  /[^/]+(?=\/$|$)/.exec(i.getAttribute('src'))
        if(src !== null){
            i.removeAttribute('src')
            i.setAttribute('src',`<?php echo bloginfo('template_url');?>${src[0]}`)
        }else{
            i.removeAttribute('src')
            i.setAttribute('src',`<?php echo bloginfo('template_url');?>/assets/images/${uploadsName}`)
        }
    }
    let sliderTitle = document.querySelector('.client__title')
    let sliderTitleText= sliderTitle.querySelector('textarea')
    let sliderParsing =`<section class="client element-animation" id="client">
            <h2 class="client__title">${sliderTitleText.getAttribute('data-value')}</h2>
            <div class="client__slider">`
            for (let i = 0;i < sliderChild.length; i++){
                sliderParsing += `
                                    <div class="client__slider-item">
                                    ${sliderChild[i].outerHTML}
                                    </div>
                                    `
            }
    page.addEventListener('onload',gos(page))
    footer.addEventListener('onload',gos(footer))
    
    const company = document.querySelector('.company-info')
    const prise = document.querySelector('#prise')
    const requisites = document.querySelector('.requisites')
    let main = `<?php
        get_header();
        ?>
        <main class="main">`
    let footers = ''
    main += company.outerHTML
    main += prise.outerHTML
    main += sliderParsing +`</div> </section>`
    main += requisites.outerHTML 
    main += ` </main > 
                <?php 
            get_footer()
            ?>`
    footers += footer.outerHTML 
    footers += `<?php wp_footer()?>
    <template id='slider__template'>
    <div class="client__slider-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 848px;" tabindex="0">
    <img src="<?php echo bloginfo('template_url'); ?>/assets/images/644520e50a2c09042fd8d680_logo_ss.svg" alt="Ставсталь" class="client__slider-image image">
    </template>
    <template id='promo__template'>
<article class="promo__item element-animation" draggable="true">
                    <h3 class="promo__item-text">Изделия электромонтажное и инструменты</h3>
                    <img class="promo__item-image image" src="<?php echo bloginfo('template_url'); ?>/assets/images/rozetka.png" alt="Розетка" draggable="false">
                    <a class="promo__item-button" href="PRAJS_17_06_19.xls" download="" draggable="false"><span class="promo__item-button-text">прайс-лист</span></a>
                </article>
</template>
    </body></html>`
    page.addEventListener('onload',go(page))
    footer.addEventListener('onload',go(footer))
    location.reload(true);
    $.post("", { action: 'callThisFunction', main: '' +  main,footers: '' + footers }, function() {
    });
});
