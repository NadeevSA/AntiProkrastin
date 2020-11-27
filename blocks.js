document.addEventListener("DOMContentLoaded", function(){
    var a = document.getElementById("myButton");
	if(a){
		a.addEventListener("click", add, false);
	}
});

document.addEventListener("DOMContentLoaded", function(){
    var a = document.getElementById("BtnDelete");
	if(a){
		a.addEventListener("click", deleteFromStorage, false);
	}
});

function getUserPrefs() {
    // с помощью этой функции можно извлечь данные
    // объект obj.key явлется массивом который сохраняет google
   /* chrome.storage.sync.get("key", function (obj) {});*/
    chrome.storage.sync.get("key", function (obj) {
        if (obj.key===undefined || obj.key==null){
            var ins=[];
            chrome.storage.sync.set({key: ins}, function() {});
            return
        }
		obj.key.forEach(
            blocks
        )
		obj.key.forEach(
            htmlAdd
        )
    });
}

function saveToStorage(value) {
    chrome.storage.sync.get("key", function (obj) {
        obj.key.push(value);
        var ins=obj.key;
        chrome.storage.sync.set({key: ins}, function() {});
        clearHtmlList();
        obj.key.forEach(
            htmlAdd
        )
    });
}

function deleteFromStorage() {
	var num = document.getElementById("nameInd");
    chrome.storage.sync.get("key", function (obj) {
        obj.key.splice(num.value - 1,1);
        var ins=obj.key;
        chrome.storage.sync.set({key: ins}, function() {});
        clearHtmlList();
        obj.key.forEach(
            htmlAdd
        )
    });
}

function blocks(value){
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) { return {cancel: true}; },
		{urls: [value]},
		["blocking"],
	)
}

function clearHtmlList() {
    var myNode=document.getElementById("myList");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

function htmlAdd(value) {
	var node = document.createElement("LI");
	var textnode = document.createTextNode(value);
	node.appendChild(textnode);
	if (document.getElementById("myList") !== null){
		document.getElementById("myList").appendChild(node);
	}
}

function add() {
    var doc = document.getElementById("name");
    var site = doc.value;
    saveToStorage("*://"+site+"/*");
	blocks("*://"+site+"/*");	
}

