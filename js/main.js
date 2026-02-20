const faders = document.querySelectorAll('.fade');
const audios = document.querySelectorAll("audio");
const toggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

audios.forEach(audio => {
  audio.addEventListener("play", () => {
    audios.forEach(other => {
      if (other !== audio) {
        other.pause();
      }
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(fade => observer.observe(fade));


toggle.addEventListener('click', () => {
  navbar.classList.toggle('open');
});