/* TimeBlocks hero demo video — plain browser JS, no frameworks.
   Woblo-style cursor-follow "Play video" control:
   the chip is anchored at the stage center and offset by
   --dx / --dy = pointer position − stage center (CSS pixels).
   Cursor-follow only for fine pointers; reduced motion keeps it centered. */

(function () {
  'use strict';

  var demo = document.querySelector('[data-demo]');
  if (!demo) return;

  var video = demo.querySelector('video');
  var cursor = demo.querySelector('.demo-cursor');
  var play = cursor ? cursor.querySelector('.demo-play') : null;
  if (!video || !cursor || !play) return;

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var playing = false;
  var inside = false;

  function markPlaying() {
    playing = true;
    demo.classList.add('is-playing');
    cursor.hidden = true;
    video.controls = true;
  }

  function markIdle() {
    playing = false;
    demo.classList.remove('is-playing');
    video.controls = false;
    // Restore the chip if the pointer is over the stage
    // (reduced motion keeps it centered; --dx/--dy stay 0).
    cursor.hidden = !(inside && finePointer.matches && !reduceMotion.matches);
  }

  function setOffset(e) {
    var rect = demo.getBoundingClientRect();
    demo.style.setProperty('--dx', (e.clientX - rect.left - rect.width / 2) + 'px');
    demo.style.setProperty('--dy', (e.clientY - rect.top - rect.height / 2) + 'px');
  }

  function requestPlay() {
    var started = video.play();
    if (started && typeof started.catch === 'function') {
      started.catch(function () {
        markIdle();
        window.alert('Playback was blocked by the browser. Please try again.');
      });
    }
    markPlaying();
  }

  // --- cursor follow (fine pointers only) ---

  function isFine(e) {
    return e.pointerType === 'mouse' || e.pointerType === 'pen';
  }

  demo.addEventListener('pointerenter', function (e) {
    if (!finePointer.matches || !isFine(e)) return;
    inside = true;
    if (playing || reduceMotion.matches) return;
    setOffset(e);
    cursor.hidden = false;
  });

  demo.addEventListener('pointermove', function (e) {
    if (!finePointer.matches || !isFine(e)) return;
    inside = true;
    if (playing) return;
    if (!reduceMotion.matches) setOffset(e);
    cursor.hidden = playing || reduceMotion.matches;
  });

  demo.addEventListener('pointerleave', function (e) {
    if (!isFine(e) && e.pointerType !== 'touch') return;
    inside = false;
    cursor.hidden = true;
  });

  // Keyboard users: show the centered chip when focus lands on the button
  play.addEventListener('focus', function () {
    if (playing) return;
    cursor.hidden = false;
  });

  // --- start playback ---

  play.addEventListener('click', function (e) {
    e.stopPropagation();
    requestPlay();
  });

  // Touch / coarse pointer: tap the stage or poster to play; no follower.
  demo.addEventListener('click', function (e) {
    if (finePointer.matches) return;
    var target = e.target;
    if (target === demo || target === video) requestPlay();
  });

  // --- pause / end restore the idle state ---

  video.addEventListener('pause', function () {
    if (!video.ended && playing) markIdle();
  });

  video.addEventListener('ended', markIdle);
})();
