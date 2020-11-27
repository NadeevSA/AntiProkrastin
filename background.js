function isHourRange(from, to) {
   var now = new Date();
   var curHour = now.getHours();
   return curHour >= from && curHour <= to;
}


for( var i = 0; i < sites.length; ++i ){
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) { return {cancel: true}; },
		{urls: [sites[i]]},
		["blocking"],
	)
}
