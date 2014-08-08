	var ml1;
	var ml2;
	var ml3;
	var ml4;

	var inputElems = {};
				// inputElems['zero'] = core_ID;
				// inputElems['one'] = accessKey;
				// inputElems['two'] = ing1;
				// inputElems['three'] = ing2;
				// inputElems['four'] = ing3;
				// inputElems['five'] = ing4;

				function inputHandler(id, key) {
					inputElems[key] = $("#" + id).val();

					alert(inputElems[key]);
					console.log(inputElems[key]);
					console.log(inputElems[key] + " = " + id);
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
					}
				});

				$(".dial2").knob({ 
					'release' : function (v) { 
						ml2 = v;
						console.log(ml2);
					}
				});

				$(".dial3").knob({ 
					'release' : function (v) { 
						ml3 = v;
						console.log(ml3);
					}
				});

				$(".dial4").knob({ 
					'release' : function (v) { 
						ml4 = v;
						console.log(ml4);
					}
				});