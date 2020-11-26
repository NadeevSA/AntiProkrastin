
var a = document.getElementById("myButton");
a.addEventListener("click", add);
sites.forEach(
    htmlAdd
);
function htmlAdd(value) {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(value);
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
}


function add() {
    var doc = document.getElementById("name");

        var site = doc.value;
        sites.push("*://"+site+"/!*");
        console.log(sites);
        htmlAdd(site)
}

