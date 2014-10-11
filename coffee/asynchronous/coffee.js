function sendRequest(request, url) {
    request.onreadystatechange = serveDrink;
    request.open("GET", url, true);
    request.send(null);
}

function getSize() {
    var sizeGroup = document.forms[0].size;
    for (i=0; i<sizeGroup.length; i++) {
        if (sizeGroup[i].checked == true) {
            return sizeGroup[i].value;
        }
    }
}

function getBeverage() {
    var beverageGroup = document.forms[0].beverage;
    for (i=0; i<beverageGroup.length; i++) {
        if (beverageGroup[i].checked == true) {
            return beverageGroup[i].value;
        }
    }  
}




function order(name,beverage,size)
{
    this.name=name;
    this.beverage=beverage;
    this.size=size;
}


function startCoffee(){
    while (orderList.length>1){
        
    }
}

var orderList = [];




function orderCoffee() {
    var name = document.getElementById("name").value;
    var beverage = getBeverage();
    var size = getSize();
    
    
    var newOrder=new order(name,beverage,size);
    orderList.push(newOrder);
    
    
    var coffeemakerStatusDiv1 = [document.getElementById("coffeemaker1-status"),document.getElementById("coffeemaker2-status"),document.getElementById("coffeemaker3-status"),document.getElementById("coffeemaker4-status")];
    var status1 = getText(coffeemakerStatusDiv1[0]);
    var status2 = getText(coffeemakerStatusDiv1[1]);
    var status3 = getText(coffeemakerStatusDiv1[2]);
    var status4 = getText(coffeemakerStatusDiv1[3]);
    if (status1 == "Idle") {
        replaceText(coffeemakerStatusDiv1[0], "Brewing " + name + "'s " +
            size + " " + beverage);
        // clear the form        
        document.forms[0].reset();
        var url = "coffeemaker.php?name=" + escape(name) +
        "&size=" + escape(size) +
        "&beverage=" + escape(beverage) +
        "&coffeemaker=1";
        sendRequest(request1, url);
    } else if (status2 == "Idle") {
        replaceText(coffeemakerStatusDiv1[1], "Brewing " + name + "'s " +
            size + " " + beverage);
        // clear the form        
        document.forms[0].reset();
        var url = "coffeemaker.php?name=" + escape(name) +
        "&size=" + escape(size) +
        "&beverage=" + escape(beverage) +
        "&coffeemaker=2";
        sendRequest(request2, url);
    } else if (status3 == "Idle") {
        replaceText(coffeemakerStatusDiv1[2], "Brewing " + name + "'s " +
            size + " " + beverage);
        // clear the form        
        document.forms[0].reset();
        var url = "coffeemaker.php?name=" + escape(name) +
        "&size=" + escape(size) +
        "&beverage=" + escape(beverage) +
        "&coffeemaker=3";
        sendRequest(request3, url);
    } else {
        if (status4 == "Idle") {
            replaceText(coffeemakerStatusDiv1[3], "Brewing " + name + "'s " +
                size + " " + beverage);
            document.forms[0].reset();
            var url = "coffeemaker.php?name=" + escape(name) +
            "&size=" + escape(size) +
            "&beverage=" + escape(beverage) +
            "&coffeemaker=4";
            sendRequest(request4, url);
        } else {
            alert("Sorry! All coffee makers are busy. " +
                "Try again later.");
        }
    }
}

// return text similar to 1Mary for Mary's order in coffer maker #1
function serveDrink() {
    if (request1.readyState == 4 || request2.readyState == 4 || request3.readyState == 4 || request4.readyState == 4) {
        if (request1.status == 200 || request2.status == 200 || request3.status == 200 || request4.status == 200)  {
            // we can proceed since one of the four coffee makers returned a ready state of 4 and a status of 200.
            //now we need to find out which one it was and store it in the variable response
            var response;
            if(request1.readyState == 4 )
                response = request1.responseText;
            else if(request2.readyState == 4 )
                response = request2.responseText;
            else if(request3.readyState == 4 )
                response = request3.responseText;
            else if(request4.readyState == 4 )
                response = request4.responseText;
    
            // get the number of the coffee maker
            var whichCoffeemaker = response.substring(0, 1);
            // get the user's name
            var name = response.substring(1, response.length);
            if (whichCoffeemaker == "1") {
                var coffeemakerStatusDiv1 = 
                document.getElementById("coffeemaker1-status");
                replaceText(coffeemakerStatusDiv1, "Idle");
                request1 = createRequest();
            } else if (whichCoffeemaker == "2"){
                var coffeemakerStatusDiv2 = 
                document.getElementById("coffeemaker2-status");
                replaceText(coffeemakerStatusDiv2, "Idle");
                request2 = createRequest();
            }else if (whichCoffeemaker == "3"){
                var coffeemakerStatusDiv3 = 
                document.getElementById("coffeemaker3-status");
                replaceText(coffeemakerStatusDiv3, "Idle");
                request3 = createRequest();
            }else if (whichCoffeemaker == "4"){
                var coffeemakerStatusDiv4 = 
                document.getElementById("coffeemaker4-status");
                replaceText(coffeemakerStatusDiv4, "Idle");
                request4 = createRequest();
            }
            alert(name + ", your coffee is ready!");
            orderList.pop()
            // this next lines resets the request object's ready state
            // we do not want it to stay at 4 or the second one would never
            // get served (the if's above would remain true)
            // JavaScript cannot directly set the readyState property to zero
            request1 = createRequest();
        } else 
            alert("Error! Request status is " + request1.status);
    } 
}