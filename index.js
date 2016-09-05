'use strict';

const got = require('got');

module.exports = (pluginContext) => {
	
    const logger = pluginContext.logger;
    const prefObj = pluginContext.preferences;
    const pref = prefObj.get();
    const shell = pluginContext.shell;
    const api_key = pref.api_key;

    function search(query, res) {
        const query_trim = query.trim();

        if (query_trim.length === 0) {
            return res.add({
            id: "https://pximg.xyz/browse/",
            payload: 'open',
            title: "Browse",
            desc: 'View all images on PXIMG."'
			});
        }

        res.add({
            id: "https://pximg.xyz/browse/",
            payload: 'open',
            title: "Browse",
            desc: 'View all images on PXIMG."'
        });
		
		if (isNaN(query_trim)) {
			return;
		}

        let subs = "https://pximg.xyz/api/v2/images/id/" + query_trim + "?api_key=" + api_key;

        got(subs).then(response => {
            let data = JSON.parse(response.body);
            data = {
                id: data.Message.url,
                payload: 'open',
                title: 'Open Image <b>' + data.Message.public_hash + '</b>',
                desc: '<span style="color:#005A9C;">( ' + data.Message.dimensions + ' ) [ ' + data.Message.uploader + ' ] [ ' + data.Message.type + ' ] [ ' + data.Message.uploaded_date + ' ]</span>',
                icon: "#fa fa-picture-o"
            };
            res.add(data);
        });
    }
    
    function execute(id, payload) {
        if (payload !== 'open') {
            return;
        }
        shell.openExternal(id);
    }

    return {
        search,
        execute
    }
}