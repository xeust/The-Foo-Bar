var ozVol = 0;
var totVol = 0;
var ml1 = 0;
var ml2 = 0;
var ml3 = 0;
var ml4 = 0;

var inputElems = {};
var inputElemsStr = {};
inputElemsStr['zero'] = "core_ID";
inputElemsStr['one'] = "accessKey";
inputElemsStr['two'] = "ing1Dis";
inputElemsStr['three'] = "ing2Dis";
inputElemsStr['four'] = "ing3Dis";
inputElemsStr['five'] = "ing4Dis";


function inputHandler(id, key) {
    inputElems[key] = $("#" + id).val();

    alert(inputElems[key]);
    console.log(inputElems[key]);
    console.log(inputElems[key] + " = " + id);
    if (id != 'input1' && id != 'input2'){
        document.getElementById(inputElemsStr[key]).innerHTML = inputElems[key];
    }
};

function mixHandler(){

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

function sendApiRequest(v) {

    var coreCall = "https://api.spark.io/v1/devices/" + inputElems['zero'] + "/mix";
    console.log('foo ' + v);
    $.post(coreCall, {access_token: inputElems['one'], arg: v});

};

function sizeSelect(size) {

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

$(document).ready(function(){

    $(".btn-slide").click(function(){
        $("#panel").slideToggle("slow");
        $(this).toggleClass("active"); return false;
    });

});


$(function() {
    // setup master volume
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


    $( "#master5" ).slider({
        min: 0,
        max: 300,
        step: 50,
        orientation: "horizontal",
        range: "min",
        animate: true
    });

});



document.getElementById("ing1Vol").innerHTML = ml1;
document.getElementById("ing2Vol").innerHTML = ml1;
document.getElementById("ing3Vol").innerHTML = ml1;
document.getElementById("ing4Vol").innerHTML = ml1;
document.getElementById("ozDis").innerHTML = ozVol;
