/* TimeBlocks hero demo video — plain browser JS, no frameworks.
   Play chip behavior (updated spec):
   - Idle / pointer outside the frame: chip is visible and centered (--dx / --dy = 0).
   - Fine pointer inside the frame (not playing): chip follows via
     --dx / --dy = pointer − stage center (CSS pixels).
   - Pointer leaves the frame: --dx / --dy return to 0 so the chip
     snaps back to center (CSS transition animates it).
   - Playing: chip hides (CSS .is-playing). Pause / ended restores the centered chip.
   Follow is fine-pointer only; reduced motion keeps it centered always;
   touch taps the stage to play. */

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

  function markPlaying() {
    playing = true;
    demo.classList.add('is-playing');
    video.controls = true;
  }

  function markIdle() {
    playing = false;
    demo.classList.remove('is-playing');
    demo.classList.remove('is-tracking');
    video.controls = false;
    // Chip is visible again, centered (--dx/--dy = 0); a pointer still
    // inside the frame re-follows on the next pointermove.
    demo.style.setProperty('--dx', '0px');
    demo.style.setProperty('--dy', '0px');
  }

  function setOffset(e) {
    var rect = demo.getBoundingClientRect();
    demo.style.setProperty('--dx', (e.clientX - rect.left - rect.width / 2) + 'px');
    demo.style.setProperty('--dy', (e.clientY - rect.top - rect.height / 2) + 'px');
  }

  function resetToCenter() {
    demo.style.setProperty('--dx', '0px');
    demo.style.setProperty('--dy', '0px');
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
    if (playing) return;
    demo.classList.add('is-tracking');
    if (!reduceMotion.matches) setOffset(e);
  });

  demo.addEventListener('pointermove', function (e) {
    if (!finePointer.matches || !isFine(e)) return;
    if (playing) return;
    if (!reduceMotion.matches) setOffset(e);
  });

  demo.addEventListener('pointerleave', function (e) {
    if (!isFine(e) && e.pointerType !== 'touch') return;
    if (playing) return;
    demo.classList.remove('is-tracking');
    if (!reduceMotion.matches) resetToCenter();
    // Chip stays visible, centered.
  });

  // --- start playback ---

  play.addEventListener('click', function (e) {
    e.stopPropagation();
    requestPlay();
  });

  // Touch / coarse pointer: tap the stage or poster to play; no follow.
  demo.addEventListener('click', function (e) {
    if (finePointer.matches) return;
    var target = e.target;
    if (target === demo || target === video) requestPlay();
  });

  // --- pause / end restore the centered idle state ---

  video.addEventListener('pause', function () {
    if (!video.ended && playing) markIdle();
  });

  video.addEventListener('ended', markIdle);
})();
