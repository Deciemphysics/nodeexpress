var results = getThem(param);

results.on('item', function(i){
  //do something
});

results.on('done', function() {
  //No ore items
});

results.on('error', function(err){
  //React to error
});

// Callbacks are request/reply
// No results until all results
//Either error or results

//Events are more publish subscribe, act on results as they arrive, and partial results occur before err

//Node has EventEmmiter class to be used

emmtter.emit(event, [args]);
emitter.on(event, listener);

//event can be any string
// can have zero or more arguments
// Constitue a interface exposed toteh subscriber