// Atelier Noir – scroll-animaties
// Elementen schuiven zacht omhoog en faden in zodra ze in beeld komen.
// Wie in zijn systeem "minder beweging" heeft aangezet, krijgt geen animaties.

(function () {
  const minderBeweging = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (minderBeweging || !('IntersectionObserver' in window)) return;

  // [selector, type, vertraging tussen elementen in seconden]
  const groepen = [
    ['.hero__inhoud > *', 'tekst', 0.12],
    ['.hero__kader', 'beeld', 0.3],
    ['.verhaal__beeld', 'beeld', 0],
    ['.verhaal__tekst > *', 'tekst', 0.1],
    ['.collectie__kop > *', 'tekst', 0.1],
    ['.geur', 'beeld', 0.15],
    ['.cta__tekst > *', 'tekst', 0.12],
    ['.formulier', 'beeld', 0.2]
  ];

  const elementen = [];
  groepen.forEach(([selector, type, stap]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal', 'reveal--' + type);
      el.style.setProperty('--vertraging', (i * stap) + 's');
      elementen.push(el);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zichtbaar');
        observer.unobserve(entry.target);   // maar één keer animeren
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elementen.forEach((el) => observer.observe(el));

})();
