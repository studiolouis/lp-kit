/* Studio Louis LP Kit / 01-shop-service
   役割: IntersectionObserverで[data-motion]を表示へ切り替えるだけの最小構成。
   - reduced-motion環境では即時表示(遷移なし)
   - Observer非対応環境でも即時表示
   - scroll hijack / layout shift なし(transform/opacityのみ) */

(function () {
  'use strict';

  var targets = document.querySelectorAll('[data-motion]');
  if (!targets.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    targets.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
