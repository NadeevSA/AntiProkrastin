let url
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    url = tabs[0].url;
	sites.push(url);
	
    // use `url` here inside the callback because it's asynchronous!
});
sites.push("asda");
for (var i=0; i< sites.length; i++) {
  var element = sites[i];
  
    document.body.innerHTML += '<p><big><big>' + element + '</big></big></p>'
}
