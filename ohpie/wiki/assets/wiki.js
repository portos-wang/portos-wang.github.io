// Progressive reveal + code copy. Deliberately small: the site is static.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  for (const win of document.querySelectorAll('.win')) {
    const bar = win.querySelector('.win-bar');
    const code = win.querySelector('code');
    if (!bar || !code || !navigator.clipboard) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'copy';
    button.className = 'win-copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'copied';
        setTimeout(() => (button.textContent = 'copy'), 1600);
      } catch {
        button.textContent = 'failed';
        setTimeout(() => (button.textContent = 'copy'), 1600);
      }
    });
    bar.appendChild(button);
  }
})();
