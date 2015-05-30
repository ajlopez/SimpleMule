
var sm = require('../..');
var url = require('url');
var http = require('http');

var visited = [];
var hostname;

var match1 = /href=\s*"([^&"]*)"/ig;
var match2= /href=\s*'([^&']*)'/ig;

var urlsite;

var flow = sm.flow()
    .transform(function (link, next) {
        var urldata = url.parse(link);
        
        if (!urlsite)
            urlsite = link;
        if (!hostname)
            hostname = urldata.hostname;
        
        if (hostname == urldata.hostname)
            next(null, link);
    })
    .transform(function (link, next) {
        console.log('downloading', link);
        
        var urldata = url.parse(link);
        
        options = {
            host: urldata.hostname,
            port: urldata.port,
            path: urldata.path,
            method: 'GET'
        };
        
        http.get(options, function(res) { 
                var result = '';
                console.log('Url: ' + link);
                res.setEncoding('utf8');
                res.on('data', function(data) {
                    result += data.toString();
                });
                res.on('end', function (data) {
                    next(null, result);
                });
           }).on('error', function(e) {
                console.log('Url:', link, 'Error:', e.message);
                next(e, null);
            });
    })
    .output(function (data, next) {
        console.log('analyzing');
        var links;

        while ((links = match1.exec(data)) !== null) {
            var link = links[1];

            //if (link.indexOf(':') < 0 && prefix)
            //  link = prefix + link;
                
            if (link.indexOf('http:') == 0)
                flow.post(link);
            else if (link[0] == '/')
                flow.post(urlsite + link);
        };

        while ((links = match2.exec(data)) !== null) {
            var link = links[1];

            //if (link.indexOf(':') < 0 && prefix)
            //  link = prefix + link;
                
            if (link.indexOf('http:') == 0)
                flow.post(link);
            else if (link[0] == '/')
                flow.post(urlsite + link);
        };
    })

    
flow.post(process.argv[2]);