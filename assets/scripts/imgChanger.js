
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

$('.image').click(imageChanger)