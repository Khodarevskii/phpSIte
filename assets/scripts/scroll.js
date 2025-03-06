function elementShow(){
  const elements = document.querySelectorAll('.element-animation');
let options = {
threshold: [0.5] };
const observer = new IntersectionObserver(onEntry, options);
function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  
  for (let elm =0; elm < elements.length;elm++) {
    observer.observe(elements[elm]);
  }

}
elementShow()
