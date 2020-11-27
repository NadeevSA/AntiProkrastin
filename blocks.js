
document.addEventListener('DOMContentLoaded', function(){
    var a = document.getElementById("myButton");
    a.addEventListener("click", add,false);

});

getUserPrefs();


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
    document.getElementById("myList").appendChild(node);
}

function add() {
    var doc = document.getElementById("name");
        var site = doc.value;
        saveToStorage("*://"+site+"/!*");
}

