'use strict';

const got = require('got');

module.exports = (pluginContext) => {
	
    const logger = pluginContext.logger;
    const prefObj = pluginContext.preferences;
    const app = pluginContext.app;
    const pref = prefObj.get();
    const shell = pluginContext.shell;
    const clipboard = pluginContext.clipboard;
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
		
		if (api_key === '') {
            return res.add({
				id: "no_api_key",
				payload: 'prefs',
				title: "No API Key Found",
				desc: "<span style=\"color:#f0ad4e;\">Please add your API key in Preferences.</span>",
				icon: "#fa fa-exclamation-triangle"
			});
        }
		
		if (query_trim.toLowerCase() == 'winnings') {
			
			let subs = "https://pximg.xyz/api/v2/me/giveaway/check?api_key=" + api_key;
			
			got(subs).then(response => {
				let data = JSON.parse(response.body);
				
				if (data.status == true) {
					for (var k in data.Message) {
						if (!data.Message.hasOwnProperty(k)) { continue; }
						var o = data.Message[k];
						var d = {
							id: o.licence_code,
							payload: "copy_to_clipboard",
							title: "<b>" + o.title + "</b>",
							desc: "<span style=\"color:#005A9C;\">" + o.licence_code + " - " + o.url + "</span>",
							icon: "#fa fa-gift"
						};
						res.add(d);
					}
				}
			});
			return;
		}
		else {
			res.add({
				id: "/px winnings",
				payload: 'set_query',
				title: "Check Giveaway Winnings",
				desc: 'Check your licence codes for giveaways that you\'ve won."'
			});
		}
		
		if (isNaN(query_trim)) {
			return res.add({
				"id": query_trim,
				"payload": "none",
				"title": "Invalid Image ID: <b>" + query_trim + "</b>",
				"desc": "<span style=\"color:#A94442;\">The image id should contain numbers only.</span>",
				"icon": "#fa fa-exclamation-triangle"
			});
		}

        let subs = "https://pximg.xyz/api/v2/images/id/" + query_trim + "?api_key=" + api_key;

        got(subs).then(response => {
            let data = JSON.parse(response.body);
			if (data.Status == true) {
				data = {
					id: data.Message.url,
					payload: "open",
					title: "Open Image <b>" + data.Message.public_hash + "</b>",
					desc: "<span style=\"color:#005A9C;\">( " + data.Message.dimensions + " ) [ " + data.Message.uploader + " ] [ " + data.Message.type + " ] [ " + data.Message.uploaded_date + " ]</span>",
					icon: "#fa fa-picture-o"
				};
			}
			else if (data.Status == false) {
				data = {
					"id": query_trim,
					"payload": "none",
					"title": "Image <b>" + query_trim + "</b>",
					"desc": "<span style=\"color:#A94442;\">"+data.Response+"</span>",
					"icon": "#fa fa-exclamation-triangle"
				};
			}
			res.add(data);
        });
    }
    
    function execute(id, payload) {
		if (payload == 'prefs') {
			app.openPreferences('hain-plugin-pximg');
			return;
		}
		if (payload == 'set_query') {
			app.setQuery(id);
			return;
		}
		if (payload == 'copy_to_clipboard') {
			clipboard.writeText(id);
			return;
		}
        if (payload !== "open") {
            return;
        }
        shell.openExternal(id);
    }

    return {
        search,
        execute
    }
}