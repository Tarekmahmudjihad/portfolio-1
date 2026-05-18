const phrases = ['Penetration Tester', 'Bug Hunter', 'Security Researcher', 'CTF Player', 'Ethical Hacker'];
let pi=0, ci=0, del=false;
const tw = document.getElementById('typewriter');
function type() {
  const p = phrases[pi];
  if(!del) {
    tw.textContent = p.slice(0, ++ci);
    if(ci === p.length) { del=true; setTimeout(type,1600); return; }
  } else {
    tw.textContent = p.slice(0, --ci);
    if(ci === 0) { del=false; pi=(pi+1)%phrases.length; }
  }
  setTimeout(type, del?60:90);
}
type();

// Scroll progress
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress-bar').style.width = (window.scrollY/h*100)+'%';
  // scroll top
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
  // active nav
  document.querySelectorAll('section[id]').forEach(s => {
    if(window.scrollY >= s.offsetTop - 80)
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#'+s.id);
      });
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      // skill bars
      e.target.querySelectorAll && e.target.querySelectorAll('.skill-fill').forEach(f => f.style.transform='scaleX('+f.parentElement.parentElement.dataset.w+')');
    }
  });
}, {threshold:0.1});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Skill bars
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, {threshold:0.2});
document.querySelectorAll('.skill-card').forEach(c => skillObserver.observe(c));

// Contact form
function handleContact() {
  const n=document.getElementById('c-name').value;
  const em=document.getElementById('c-email').value;
  const msg=document.getElementById('form-msg');
  if(!n||!em){ msg.textContent='> Please fill in required fields.'; msg.style.color='#ff4444'; msg.style.display='block'; return; }
  msg.textContent='> Message sent successfully! I\'ll reply soon.';
  msg.style.color='var(--green)'; msg.style.display='block';
  ['c-name','c-email','c-subject','c-message'].forEach(id => document.getElementById(id).value='');
}

// Mobile menu
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}