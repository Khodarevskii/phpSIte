<?php

function add_custom_toolbar($admin_bar) {
  $admin_bar->add_menu(array(
	'id'     => 'triggerPhp',      // ID элемента меню. Обязательный. Строка.
	'title'  => '<button id="triggerPhp">Опубликовать</button>',
   ));
}


add_action('wp_enqueue_scripts','myscript_scripts');

function myscript_scripts(){
    wp_enqueue_style('energo-style', get_stylesheet_uri());
    wp_enqueue_style('fonts-style', get_template_directory_uri() . '/assets/fonts/fonts.css');
    wp_enqueue_script('jquerys',  get_template_directory_uri() . '/assets/scripts/jquery.js', array(), null, true);
    wp_enqueue_script('burger',  get_template_directory_uri() . '/assets/scripts/burger.js',array(), null, true);
    wp_enqueue_script('scroll',  get_template_directory_uri() . '/assets/scripts/scroll.js',array('jquery'), null, true);
    wp_enqueue_script('slick',  get_template_directory_uri() . '/assets/scripts/slick.min.js',array('jquery'), null, true);

};
function my_enqueue(){
	wp_enqueue_script( 'custom-customize', get_template_directory_uri() . '/assets/scripts/textChanger.js', array( ), false, true );
	wp_enqueue_script( 'dargon-drop', get_template_directory_uri() . '/assets/scripts/dragnDrop.js', array( ), false, true );
	wp_enqueue_script('sliderClone',  get_template_directory_uri() . '/assets/scripts/sliderNoclone.js',array('jquery'), null, false);
	wp_enqueue_script('sliders',  get_template_directory_uri() . '/assets/scripts/buttonCreator.js',array('jquery'), null, true);
}


function ajax_script(){
	wp_enqueue_script('ajax',  get_template_directory_uri() . '/assets/scripts/ajax.js',array('jquery'), null, true);
}
if ( !is_user_logged_in()){
	wp_enqueue_script('slider',  get_template_directory_uri() . '/assets/scripts/slider.js',array('jquery'), null, true);
}


if ( current_user_can( 'administrator' ) && is_admin_bar_showing($show)  ){
	add_action('admin_bar_menu', 'add_custom_toolbar', 100);
	add_action('wp_head','my_enqueue');
	add_action('wp_enqueue_scripts','ajax_script');
	add_action( 'wp_enqueue_scripts', 'true_include_myuploadscript' );
	wp_enqueue_style('energo-styles', get_template_directory_uri() . '/style.css');
}

function clones(){
	$main = wp_unslash($_POST['main']);
	$mainFile = __DIR__ . '/index.php';
	file_put_contents($mainFile, $main);
	$footer = wp_unslash($_POST['footers']);
	$footerFile = __DIR__ . '/footer.php';
	file_put_contents($footerFile, $footer);
}

if ($_POST['action'] == 'callThisFunction' ) {
  clones();
}


function clonesImage(){
	$img = wp_unslash($_POST['image']);
	$imageName = $_POST['imageName'];
	$filename = __DIR__ . "/assets/images/$imageName";
	file_put_contents($filename, file_get_contents($img));
}

if ($_POST['action'] == 'go' ) {
	clonesImage();
}


 
function true_include_myuploadscript( $hook ) {
	// у вас в админке уже должен быть подключен jQuery, если нет - раскомментируйте следующую строку:
	 wp_enqueue_script('jquery');
	// дальше у нас идут скрипты и стили загрузчика изображений WordPress
	if ( ! did_action( 'wp_enqueue_media' ) ) {
		wp_enqueue_media();
	}
	// само собой - меняем admin.js на название своего файла
 	wp_enqueue_script( 'myuploadscript', get_stylesheet_directory_uri() . '/assets/scripts/imgChanger.js', array('jquery'), null, true );
}

function true_image_uploader_field( $args ) {
	// следующая строчка нужна только для использования на страницах настроек
	$value = get_option( $args[ 'name' ] );
	// следующая строчка нужна только для использования в мета боксах
	$value = $args[ 'value' ];
	$default = get_stylesheet_directory_uri() . '/placeholder.png';
 
	if( $value && ( $image_attributes = wp_get_attachment_image_src( $value, array( 150, 110 ) ) ) ) {
		$src = $image_attributes[0];
	} else {
		$src = $default;
	}
}
if ( is_blog_admin() ) {
	wp_enqueue_style('stylee', get_template_directory_uri() . '/assets/styles/buttonNone.css');
}

function my_custom_admin_head() {
	wp_enqueue_style('energo-styless', get_template_directory_uri() . '/style.css');
}
add_action( 'admin_head', 'my_custom_admin_head' );
?>