let lastUrl = "";

let re = /File:[^\/]*\.mid[i]?$/;

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if(details.initiator !== undefined && details.type != "xmlhttprequest" && !re.test(details.url)){
			play(details.url);
			return {redirectUrl: 'javascript:void(0)'}
		}
	},
	{urls: ["*://*/*.mid", "*://*/*.midi"]},
	["blocking"]
);

function play(url){
	if(lastUrl == url && MIDIjs.isPlaying()){
		MIDIjs.stop();
	}
	else{
		lastUrl = url;
		MIDIjs.play(url);
	}
}