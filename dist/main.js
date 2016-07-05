var config = require ('config');
var creepsManager = require('creeps_manager');

module.exports.loop = function () {
	
	// Add to memory manager
	for(var i in Memory.creeps) {
    if(!Game.creeps[i]) {
      delete Memory.creeps[i];
    }
  }
  
	// Update Creeps Manager
	creepsManager.update();
	
	
	// End frame
	console.log("[" + Game.time + "] Tick finished with: " + Game.cpu.getUsed() + "/" + Game.cpu.limit + " CPU cost");
}
