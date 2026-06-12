(function () {
    'use strict';

    var el = document.getElementById('typewriter-text');
    if (!el) return;

    var phrases = [
        '...',
        'Senior Data Scientist',
        'Senior ML Engineer',
        'Senior AI Engineer',
    ];

    var phraseIndex = 0;
    var charIndex   = 0;
    var deleting    = false;

    var SPEED_TYPE   = 75;
    var SPEED_DELETE = 35;
    var PAUSE_AFTER  = 1800;
    var PAUSE_BEFORE = 400;

    function tick() {
        var phrase = phrases[phraseIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = phrase.slice(0, charIndex);

            if (charIndex === phrase.length) {
                setTimeout(function () { deleting = true; tick(); }, PAUSE_AFTER);
                return;
            }
            setTimeout(tick, SPEED_TYPE);
        } else {
            charIndex--;
            el.textContent = phrase.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, PAUSE_BEFORE);
                return;
            }
            setTimeout(tick, SPEED_DELETE);
        }
    }

    setTimeout(tick, 800);
}());
