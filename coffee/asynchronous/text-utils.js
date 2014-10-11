// takes an element object, like a <div> and a string of text
// replaces the current text of the object with this new text
function replaceText(el, text) {
    if (el != null) {
        clearText(el);
        var newNode = document.createTextNode(text);
        el.appendChild(newNode);
    }
}
// removes the text from an element object
// it does so by removing all of the child nodes of the element that you passed in
function clearText(el) {
    if (el != null) {
        if (el.childNodes) {
            //loop through the child nodes and remove each one.
            // NOTE: removes all child nodes even if they are not text nodes
            for (var i = 0; i < el.childNodes.length; i++) {
                var childNode = el.childNodes[i];
                el.removeChild(childNode);
            }
        }
    }
}
// returns all of the text of an element object

function getText(el) {
    var text = "";
    if (el != null) {
        if (el.childNodes) {
            for (var i = 0; i < el.childNodes.length; i++) {
                var childNode = el.childNodes[i];
                // element nodes and other non-text nodes have a null nodeValue
                if (childNode.nodeValue != null) {
                    // it is a text node if it gets here so take the nodeValue (the text)
                    // and append it to any existing text
                    text = text + childNode.nodeValue;
                }
            }
        }
    }
    // returns all the text in the element
    return text;
}