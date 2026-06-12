// Medium RSS → writing-rows for the portfolio Writing section.
// Fetches the latest articles via rss2json and injects .writing-row elements
// into #jsonContent (which already has class="writing" in the HTML).

$(function () {

    function formatDate(dateStr) {
        if (!dateStr) return 'MEDIUM';
        var d = new Date(dateStr);
        var year = d.getFullYear();
        if (isNaN(year)) return 'MEDIUM';
        return year + ' · MEDIUM';
    }

    function getTag(item) {
        if (item.categories && item.categories.length) {
            return item.categories[0];
        }
        return 'Article';
    }

    $.get(
        'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40utomorezadwi',
        function (response) {
            if (response.status !== 'ok') return;

            var display = '';
            $.each(response.items, function (k, item) {
                var dateLabel = formatDate(item.pubDate);
                var tag       = getTag(item);

                display +=
                    '<a class="writing-row" href="' + item.link + '" target="_blank" rel="noopener">' +
                    '<span class="w-date">' + dateLabel + '</span>' +
                    '<h4>' + item.title + '</h4>' +
                    '<span class="w-tag">' + tag + '</span>' +
                    '<span class="w-arrow">→</span>' +
                    '</a>';

                return k < 5; // show up to 6 articles (k 0-5)
            });

            $('#jsonContent').html(display);
        }
    );
});
