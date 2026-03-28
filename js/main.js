    /* ── NAVBAR ── */
    const navbar  = document.getElementById('navbar');
    const navLinks = document.getElementById('nav-links');
    const toggle  = document.getElementById('nav-toggle');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        navbar.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    /* ── SCROLL FADE ── */
    const faders = document.querySelectorAll('.fade');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    faders.forEach(el => io.observe(el));

    /* ── CUSTOM AUDIO PLAYERS ── */
    const players = document.querySelectorAll('.player');
    const instances = [];

    const fmt = t => {
      if (!isFinite(t)) return '—:——';
      const m = Math.floor(t / 60);
      const s = String(Math.floor(t % 60)).padStart(2, '0');
      return `${m}:${s}`;
    };

    players.forEach(playerEl => {
      const src   = playerEl.dataset.src;
      const btn   = playerEl.querySelector('.play-btn');
      const fill  = playerEl.querySelector('.player-fill');
      const seek  = playerEl.querySelector('.player-seek');
      const tCur  = playerEl.querySelector('.t-cur');
      const tTot  = playerEl.querySelector('.t-tot');
      const audio = new Audio(src);

      instances.push({ audio, btn });

      audio.addEventListener('loadedmetadata', () => {
        tTot.textContent = fmt(audio.duration);
      });

      btn.addEventListener('click', () => {
        const paused = audio.paused;
        instances.forEach(({ audio: a, btn: b }) => {
          if (a !== audio) { a.pause(); b.classList.remove('playing'); }
        });
        if (paused) { audio.play(); btn.classList.add('playing'); }
        else        { audio.pause(); btn.classList.remove('playing'); }
      });

      audio.addEventListener('timeupdate', () => {
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        fill.style.width = pct + '%';
        tCur.textContent = fmt(audio.currentTime);
      });

      audio.addEventListener('ended', () => {
        btn.classList.remove('playing');
        fill.style.width = '0%';
        tCur.textContent = '0:00';
      });

      seek.addEventListener('click', e => {
        const r = seek.getBoundingClientRect();
        audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
      });
    });