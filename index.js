'use strict'

const got = require('got');
const logger = pluginContext.logger;
const prefObj = pluginContext.preferences;
const pref = prefObj.get();

module.exports = (pluginContext) => {
	const shell = pluginContext.shell;
	const logger = pluginContext.logger;
	const api_key = "";
  
	function startup() {
		let subs = "https://pximg.xyz/api/v2/me/validate";

		got.post(
			subs,
			{
				"username": pref.username,
				"password": pref.password
			}
		).then(response => {
			let data = JSON.parse(response.body);
			if (data.status) {
				api_key = data.Response.api_key;
			}
			else {
				api_key = "";
				console.log("Validation Failed.");
			}
		});
	}

	function search(query, res) {
		const query_trim = query.trim();

		if (query_trim.length === 0 || isNaN(query_trim)) {
			return;
		}

		res.add({
			id: "https://pximg.xyz/browse/",
			payload: 'open',
			title: "Browse",
			desc: 'View all images on PXIMG."'
		});

		let subs = "https://pximg.xyz/api/v2/images/id/" + query_trim + "?api_key=" + api_key;

		got(subs).then(response => {
			let data = JSON.parse(response.body);
			data = {
				id: data.Message.url,
				payload: 'open',
				title: '<b>' + data.Message.name + '</b> - <span style="color:#005A9C; font-size:0.8em;">(' + data.Message.dimensions + ') [' + data.Message.uploader + ']</span>',
				desc: 'Go directly to the "' + data.Message.name + '" image.',
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