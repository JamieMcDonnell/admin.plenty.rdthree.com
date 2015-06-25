// set up console log storing
function buildLog(type, args, now, style){
store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+"<p style='"+style+"'>"+type.toUpperCase()+": ");
 
 for (var i = 0, j = args.length; i < j; i++){
	if(typeof args[i] === "object"){
		try{
			store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+JSON.stringify(args[i]).replace(/,/g, "<br/>"));
		}catch(err){
			store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+args[i]);
		}
	}else if(typeof arguments[i] === "array"){
		store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+JSON.stringify(args[i]).replace(/,/g, "<br/>"));
	}else{
		store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+args[i]);
		if(i >= 0 && i < args.length -1){
			store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+", ");
		}
	}
}

store.set("consoleLogs", (store.get("consoleLogs") ? store.get("consoleLogs") : "" )+" - " + now + "</p>");
}

function trimLog(){
 /*
if(store.get("consoleLogs").length >= 1048576){
	//get a quater of the current log length
	var quarterLog = store.get("consoleLogs").length / 4; 
	//slice the log from the end of the first quater to the end
	var newLogs =store.get("consoleLogs").slice(quarterLog, store.get("consoleLogs").length);
	//overwrite the old log with the new
	store.set("consoleLogs", newLogs);
}
*/
}

var oldLog = console.log;
console.log = function() {
trimLog();
 var newDate = new Date();
 var now = "Time: " + newDate.today() + " @ " + newDate.timeNow();
 buildLog("log", arguments, now, 'color:black;'); 
 oldLog.apply(console, arguments);
};

var oldError = console.error;
console.error = function() {
trimLog();
 var newDate = new Date();
 var now = "Time: " + newDate.today() + " @ " + newDate.timeNow();
 buildLog("error", arguments, now, 'color:black;background-color:red;'); 
 oldError.apply(console, arguments);
};

var oldWarn = console.warn;
console.warn = function() {
trimLog();
 var newDate = new Date();
 var now = "Time: " + newDate.today() + " @ " + newDate.timeNow();
 buildLog("warn", arguments, now, 'color:black;background-color:yellow;'); 
 oldWarn.apply(console, arguments);
};

var oldDebug = console.debug;
console.debug = function() {
trimLog();
 var newDate = new Date();
  var now = "Time: " + newDate.today() + " @ " + newDate.timeNow();
 buildLog("debug", arguments, now, 'color:blue;'); 
 oldDebug.apply(console, arguments);
};

var oldInfo = console.info;
console.info = function() {
 trimLog();
 var newDate = new Date();
  var now = "Time: " + newDate.today() + " @ " + newDate.timeNow();
 buildLog("info", arguments, now, 'color:green;'); 
 oldInfo.apply(console, arguments);
};

var oldTrace = console.trace;
console.trace = function() {
trimLog();
 var newDate = new Date();
  var now = "Time: " + newDate.today() + " @ " + newDate.timeNow();
 buildLog("trace", arguments, now, 'color:grey;'); 
 oldTrace.apply(console, arguments);
};