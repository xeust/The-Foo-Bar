var ozVol = 0; //display for the current size of the drink on the web page, in ounces
var totVol = 0; //total volume of the drink, in milliliters
var ml1 = 0; //parts requested of ingredient 1
var ml2 = 0; //parts requested of ingredient 2
var ml3 = 0; //parts requested of ingredient 3
var ml4 = 0; //parts requested of ingredient 4

var inputElems = {}; //object for storing the values of the inputs in the setup panel
var inputElemsStr = {}; //object for storing the string reference names for the inputs in the setup panel
inputElemsStr['zero'] = "core_ID";
inputElemsStr['one'] = "accessKey";
inputElemsStr['two'] = "ing1Dis";
inputElemsStr['three'] = "ing2Dis";
inputElemsStr['four'] = "ing3Dis";
inputElemsStr['five'] = "ing4Dis";


function inputHandler(id, key) { //handles the inputs when a "submit" is clicked, storing the value in inputElems and reflecting them on the web page
    inputElems[key] = $("#" + id).val();

    alert(inputElems[key]);
    console.log(inputElems[key]);
    console.log(inputElems[key] + " = " + id);
    if (id != 'input1' && id != 'input2'){
        document.getElementById(inputElemsStr[key]).innerHTML = inputElems[key];
    }
};

function mixHandler(){ //handles the click of the "mix" button by calculating how many seconds each pump should be turned on for, then calling sendApiRequest


    var totParts = ml1 + ml2 + ml3 + ml4;

    if (totVol > 400){

        alert("2 Turnt...try a smaller drink");
    } else if (totParts <= 0) {
        alert("Need parts to turn up");
    } else if (totVol <= 0) {
        alert("Choose a drink size");
    } else {

        var stringVal1 = Math.round((totVol/totParts)*ml1*.6);
        var stringVal2 = Math.round((totVol/totParts)*ml2*.6);
        var stringVal3 = Math.round((totVol/totParts)*ml3*.6);
        var stringVal4 = Math.round((totVol/totParts)*ml4*.6);
        var concatStr = "" + stringVal1 + "," + stringVal2 + "," + stringVal3 + "," + stringVal4;
        console.log(concatStr);
        sendApiRequest(concatStr);

    }

}

function sendApiRequest(v) { //calls the Spark function "mix" to pass the drink-making baton to the onboard hardware.

    var coreCall = "https://api.spark.io/v1/devices/" + inputElems['zero'] + "/mix";
    console.log('foo ' + v);
    $.post(coreCall, {access_token: inputElems['one'], arg: v});

};

function sizeSelect(size) {//handles the event of a user selecting one of the three size buttons, reflecting that on the webpage

    totVol = size;

    if (size == 50) {
        ozVal = 1.5;
    } else if (size == 150) {
        ozVal = 5;
    } else {
        ozVal = 8.5;
    }
    document.getElementById("ozDis").innerHTML = ozVal;
    console.log(ozVal);
}


$(function() { //function that creates the sliders for part selection
    
    var slider1 = $( "#master1" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 5,
        step: 0.5,
        value: 0,
        reversed : true,
    })

    .on('slideStop', function ()
                    {
                        ml1 = slider1.slider('getValue');
                        console.log(ml1);
                        document.getElementById("ing1Vol").innerHTML = ml1;

                        
                    }
        );



    var slider2 = $( "#master2" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 5,
        step: 0.5,
        value: 0,
        reversed : true,
    })

    .on('slideStop', function ()
                    {
                        ml2 = slider2.slider('getValue');
                        console.log(ml2);
                        document.getElementById("ing2Vol").innerHTML = ml2;
                        
                    }
        );



    var slider3 = $( "#master3" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 5,
        step: 0.5,
        value: 0,
        reversed : true,
    })

    .on('slideStop', function ()
                    {
                        ml3 = slider3.slider('getValue');
                        console.log(ml3);
                        document.getElementById("ing3Vol").innerHTML = ml3;
                       
                    }
        );



    var slider4 = $( "#master4" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 5,
        step: 0.5,
        value: 0,
        reversed : true,
    })

    .on('slideStop', function ()
                    {
                        ml4 = slider4.slider('getValue');
                        console.log(ml4);
                        document.getElementById("ing4Vol").innerHTML = ml4;
                        
                    }
        );


});



document.getElementById("ing1Vol").innerHTML = ml1; //initialize ingredient 1 parts to 0 on the webpage.
document.getElementById("ing2Vol").innerHTML = ml2; //initialize ingredient 2 parts to 0 on the webpage.
document.getElementById("ing3Vol").innerHTML = ml3; //initialize ingredient 3 parts to 0 on the webpage.
document.getElementById("ing4Vol").innerHTML = ml4; //initialize ingredient 4 parts to 0 on the webpage.
document.getElementById("ozDis").innerHTML = ozVol; //initialize the size to 0 ounces on the webpage.
