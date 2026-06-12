(function ($) {
    'use strict';

    /* ── Experience: card grid + modal popup ── */
    function initExperience() {
        /* Build modal once */
        var $overlay = $(
            '<div class="exp-modal-overlay" role="dialog" aria-modal="true">' +
              '<div class="exp-modal">' +
                '<button class="exp-modal-close" aria-label="Close"><i class="fa fa-times"></i></button>' +
                '<div class="exp-modal-inner"></div>' +
              '</div>' +
            '</div>'
        );
        $('body').append($overlay);

        var $inner = $overlay.find('.exp-modal-inner');

        function openModal(h3Html, h4Html, dateText, bodyHtml) {
            $inner.html(
                h3Html +
                h4Html +
                (dateText ? '<span class="card-date">' + $('<span>').text(dateText).html() + '</span>' : '') +
                '<div class="exp-modal-body">' + bodyHtml + '</div>'
            );
            $overlay.addClass('is-visible');
            $('body').css('overflow', 'hidden');
        }

        function closeModal() {
            $overlay.removeClass('is-visible');
            $('body').css('overflow', '');
        }

        $overlay.find('.exp-modal-close').on('click', closeModal);
        $overlay.on('click', function (e) { if ($(e.target).is($overlay)) closeModal(); });
        $(document).on('keydown.expmodal', function (e) { if (e.key === 'Escape') closeModal(); });

        /* Process each experience card */
        $('#experience-timeline .vtimeline-point').each(function () {
            var $point   = $(this);
            var $content = $point.find('.vtimeline-content');
            var dateText = $point.find('.vtimeline-date').text().trim();

            /* Capture header + body HTML before we change anything */
            var h3Html   = $content.find('h3').first().prop('outerHTML') || '';
            var h4Html   = $content.find('h4').first().prop('outerHTML') || '';
            var $clone   = $content.clone();
            $clone.find('h3').first().remove();
            $clone.find('h4').first().remove();
            var bodyHtml = $clone.html().trim();

            /* Rebuild card: only show h3, h4, date */
            $content.empty();
            var $h3 = $(h3Html);
            var $h4 = $(h4Html);
            var $titles = $('<div class="collapse-titles"></div>').append($h3).append($h4);
            if (dateText) {
                $titles.append($('<span class="card-date"></span>').text(dateText));
            }
            var $icon   = $('<i class="fa fa-expand card-expand-icon" aria-hidden="true"></i>');
            var $header = $('<div class="collapsible-header"></div>').append($titles).append($icon);
            $content.append($header);

            $content.on('click', function () {
                openModal(h3Html, h4Html, dateText, bodyHtml);
            });
        });
    }

    /* ── Projects: hide identical stock images, fix positioning ── */
    function initProjects() {
        $('#projects .project-image').hide();
        $('#projects .project-info').css({
            position: 'relative',
            top: 'auto',
            transform: 'none',
            'margin-left': '0'
        });
    }

    /* ── Certificates: wrap in grid + collapsible ── */
    function initCertificates() {
        var $blocks = $('.optional-section-block');
        if (!$blocks.length) return;

        $blocks.wrapAll('<div class="cert-grid"></div>');

        $blocks.each(function () {
            var $block   = $(this);
            $block.find('.project-image').hide();

            var $h3      = $block.find('h3').first().detach();
            $block.wrapInner('<div class="collapse-body"></div>');
            var $body    = $block.find('.collapse-body');

            var $chevron = $('<i class="fa fa-chevron-down collapse-chevron is-closed" aria-hidden="true"></i>');
            var $header  = $('<div class="collapsible-header"></div>').append($h3).append($chevron);
            $block.prepend($header);
            $body.hide();

            $header.on('click', function () {
                $body.slideToggle(260);
                $chevron.toggleClass('is-open is-closed');
            });
        });
    }

    /* ── Scroll entrance animations ── */
    function initScrollAnimations() {
        if (!window.IntersectionObserver) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('anim-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

        var groups = [
            '#about .col-md-8',
            '#about .col-md-4',
            '.vtimeline-point',
            '.education-block',
            '#projects .project',
            '.optional-section-block',
            '#hire-me',
            '#skills ul',
        ];

        groups.forEach(function (sel) {
            $(sel).each(function (i) {
                this.classList.add('anim-out');
                this.style.transitionDelay = Math.min(i * 0.07, 0.28) + 's';
                observer.observe(this);
            });
        });
    }

    $(document).ready(function () {
        initExperience();
        initProjects();
        initCertificates();
        initScrollAnimations();
    });

}(jQuery));
