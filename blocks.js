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

document.addEventListener("DOMContentLoaded", function(){
    var a = document.getElementById("BtnRestart");
    if(a){
        a.addEventListener("click", blocksAllInMemory, false);
    }
});

getUserPrefs();

function getUserPrefs() {
    chrome.storage.sync.get("key", function (obj) {
        if (obj.key===undefined || obj.key==null){
            var ins=[];
            chrome.storage.sync.set({key: ins}, function() {});
            return
        }
        console.log(obj.key);
		blocks(obj.key);
		obj.key.forEach(
            htmlAdd
        )
    });
}

document.addEventListener("DOMContentLoaded", function(){
    var c = document.getElementById('OnOff');
	if(c){
		c.onclick = function() {
			getUserPrefs();
		}
	}
});


function blocksAllInMemory() {
    chrome.runtime.reload();
}

		
function blocks(value){
    if (value && value.length>0) {
        chrome.webRequest.onBeforeRequest.addListener(
            function (details) {
                return {cancel: true};
            },
			{urls: value},
            ["blocking"],
        );
    }
}

function saveToStorage(value) {
    chrome.storage.sync.get("key", function (obj) {
        obj.key.push(value);
        var ins=obj.key;
        chrome.storage.sync.set({key: ins}, function() {});
        console.log(obj.key);
        clearHtmlList();
        obj.key.forEach(
            htmlAdd
        )
    });
}

function deleteFromStorage() {
	var num = document.getElementById("nameInd");
    chrome.storage.sync.get("key", function (obj) {
        obj.key.splice(num.value - 1, 1);
        var ins=obj.key;
        chrome.storage.sync.set({key: ins}, function() {});
        clearHtmlList();
        console.log(obj.key);
        obj.key.forEach(
            htmlAdd
        )
    });
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
	if(site != "")
		saveToStorage("*://"+site+"/*");
}

