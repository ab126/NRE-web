
// Enable smooth scroll on all in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    }
    });
});

// Fill year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple reveal on entering viewport (like midwam's subtle reveal)
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
    });
},{threshold:.12});
reveals.forEach(r=>io.observe(r));

// Parallax: move fixed decorative items by data-speed relative to scroll
const parallaxItems = document.querySelectorAll('.parallax-item');
function onScroll(){
    const scrollY = window.scrollY || window.pageYOffset;
    parallaxItems.forEach(el=>{
    const speed = parseFloat(el.dataset.speed) || 0.15;
    // gentle vertical translate and slight horizontal oscillation
    const ty = -scrollY * speed;
    const tx = Math.sin(scrollY * 0.0008 + (speed*10)) * 40 * speed;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${tx*0.02}deg)`;
    });

    // progress bar
    const progress = document.querySelector('.progress>i');
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollY / docH) * 100 : 0;
    progress.style.height = pct + '%';
}

// throttle using requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', ()=>{
    if(!ticking){
    window.requestAnimationFrame(()=>{ onScroll(); ticking=false; });
    ticking = true;
    }
},{passive:true});

// initial call
onScroll();

// Expandable work cards, collapsing right column
const rightCol = document.querySelector('.right-col');
const workWrap = document.querySelector('.work-wrap');

document.querySelectorAll('.card.expandable').forEach(card => {
    card.addEventListener('click', (e) => {

        // prevent double trigger from inner clicks
        e.stopPropagation();

        const isOpen = card.classList.contains('expanded');

        // Close ALL cards first
        document.querySelectorAll('.card.expanded')
            .forEach(c => c.classList.remove('expanded'));
        

        // Toggle this card
        if (!isOpen) {
            card.classList.add('expanded');
            rightCol.classList.add('hidden');   // hide right column
            workWrap.classList.add('expanded-mode');  // collapse grid to 1 column
        } else {
            rightCol.classList.remove('hidden'); // bring it back
            workWrap.classList.remove('expanded-mode');  // restore 2 columns
        }
    });
});


