function parseQuery(url) {
    if (!url) {
        return {};
    }

    var query = url.split('?')[1],
        dst = {};

    query.split('&').forEach(function(cur) {
        dst[decodeURIComponent(cur.split('=')[0])] = decodeURIComponent(cur.split('=')[1]);
    });

    return dst;
}

function parseQuery(url) {
    var dst = {},
        reg = /[?&]([^=&#]+)=([^&#]*)/g,
        queries = url.match(reg);

    if (queries) {
        queries.forEach(function(cur) {
            dst[decodeURIComponent(cur.split('=')[0]).slice(1)] = decodeURIComponent(cur.split('=')[1]);
        });
    }

    return dst;
}
