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

    document.getElementById(inputElemsStr[key]).innerHTML = inputElems[key];
    };

function mixHandler(){

    var total = ml1 + ml2 + ml3 + ml4;
    if (total > 400){
    alert("2 Turnt...try a smaller drink");
    } else {
    var stringVal1 = ml1*.6;
    var stringVal2 = ml2*.6;
    var stringVal3 = ml3*.6;
    var stringVal4 = ml4*.6;
    var concatStr = "" + stringVal1 + "," + stringVal2 + "," + stringVal3 + "," + stringVal4;
    sendApiRequest(concatStr);
    }

    }

function sendApiRequest(v) {
    var coreCall = "https://api.spark.io/v1/devices/" + inputElems['zero'] + "/mix";
    console.log('foo ' + v);
    $.post(coreCall, {access_token: inputElems['one'], arg: v});
    };

$(document).ready(function(){

    $(".btn-slide").click(function(){
        $("#panel").slideToggle("slow");
        $(this).toggleClass("active"); return false;
    });

    });

$(".dial1").knob({
    'release' : function (v) {
    ml1 = v;
    console.log(ml1);
    document.getElementById("ing1Vol").innerHTML = ml1/20;
    }
    });

$(".dial2").knob({
    'release' : function (v) {
    ml2 = v;
    console.log(ml2);
    document.getElementById("ing2Vol").innerHTML = ml2/20;
    }
    });

$(".dial3").knob({
    'release' : function (v) {
    ml3 = v;
    console.log(ml3);
    document.getElementById("ing3Vol").innerHTML = ml3/20;
    }
    });

$(".dial4").knob({
    'release' : function (v) {
    ml4 = v;
    console.log(ml4);
    document.getElementById("ing4Vol").innerHTML = ml4/20;
    }
    });

document.getElementById("ing1Vol").innerHTML = ml1/20;
document.getElementById("ing2Vol").innerHTML = ml1/20;
document.getElementById("ing3Vol").innerHTML = ml1/20;
document.getElementById("ing4Vol").innerHTML = ml1/20;