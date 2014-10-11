// creates the request object.  Code needed since Microsoft does it
// differently than other browsers
//NOTE= jQuery takes care of that for you.
function createRequest() {
    var request = null;
    try {
        request = new XMLHttpRequest();
    } catch (trymicrosoft) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }

    if (request == null) {
        alert("Error creating request object!");
    } else {
        return request;
    }
}
// note - the four requests are put in static code (outside of JS functions)
// therefore it gets run when the file first gets interpreted - not when a function runs
//Any errors that occur in creating a request will get reported
// before the coffeee maker can be used.
// a request object can be used for multiple requests but only one at a time
//so we create two of them.
var request1 = createRequest();
var request2 = createRequest();
var request3 = createRequest();
var request4 = createRequest();