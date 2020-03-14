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
        protoReg = /(\w+):\/\/([^/:]+)(:\d+)/,
        paraReg = /[?&]([^=&#]+)=([^&#]*)/g,
        queries = url.match(paraReg),
        descs = url.match(protoReg);

    if (queries) {
        queries.forEach(function(cur) {
            dst[decodeURIComponent(cur.split('=')[0]).slice(1)] = decodeURIComponent(cur.split('=')[1]);
        });
    }

    if (descs) {
        dst._protocol = descs[1];
        dst._domain = descs[2];
        dst._port = descs[3];
    }

    return dst;
}
