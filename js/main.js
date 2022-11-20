// Hide / Show navbar 'Brand' element upon menu toggler click:

const navBrandElement = document.getElementById('navbar-brand-a');

document.getElementById('navbar-toggler').addEventListener('click', function(){
    navBrandElement.classList.toggle('hidden');
})