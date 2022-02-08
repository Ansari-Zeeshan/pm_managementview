const overlay = document.querySelector('.myoverlay');
const mobileTrigger = document.querySelector('.mobile-menuhead .hamberger-menu span');
const mobileMenu = document.querySelector('nav');

mobileTrigger.addEventListener('click',()=>
{
    if(!mobileMenu.classList.contains('active'))
    {
       mobileMenu.classList.add('active');
       overlay.classList.add('active');
    }
})

window.addEventListener('click', hideFilterdiv);
function hideFilterdiv(e) {
    if (e.type === "click" && e.target == overlay) {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        // console.log('hello');
    }
}

window.addEventListener('resize',()=>
{
    if(this.innerWidth < 849)
    {
       overlay.classList.remove('active');
       mobileMenu.classList.remove('active');
    }
})