var config = require('config');

// Creeps
var roleHarvester = require('role.harvester');
var roleMiner = require('role.miner');
var roleCarrier = require('role.carrier');
var roleBuilder = require('role.builder');

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeps_manager');
 * mod.thing == 'a thing'; // true
 */

 var currentCreepsNumber = {
  harvesters : 0
};


function getCreepsWithRole(role){
  var totalCreeps = [];
  

  if(!Game.creeps.length > 0){
    totalCreeps = 0;
  }
  
  for(var i in Game.creeps) {
    if(Game.creeps[i].memory.role == role) {
      totalCreeps.push(Game.creeps[i]);
    }
  }
  
  return totalCreeps;
}


function getNumberCreepsWithRole(role){
  var numberCreeps = 0;
  
  if(!Game.creeps.length > 0){
    numberCreeps = 0;
  }
  
  for(var i in Game.creeps) {
    if(Game.creeps[i].memory.role == role) {
      numberCreeps++;
    }
  }
  
  return numberCreeps;
  
}




var creepsManager = {
  update: function() {
    
   getNumberCreepsWithRole("miner")
   /* MOVE THIS FRAGMENTS OF CODE TO A FUNCTION */
   
	    // Check every frame if we should increase the number of harvesters
	    var currHarvesters = getNumberCreepsWithRole("harvester");
	    
	    if(currHarvesters < config.total_harvesters){
	        // Change to creep factory method
	        var harvester = [CARRY, MOVE, WORK];
          Game.spawns.Spawn1.createCreep(harvester, null, {role: "harvester"});
        }
        
        
	    // Check every frame if we should increase the number of harvesters
	    var currMiners = getNumberCreepsWithRole("miner");
	    if(currMiners < config.total_miners){
	        // Change to creep factory method
	        var miner = [MOVE, CARRY, CARRY, CARRY, WORK]; // 300 cost
          Game.spawns.Spawn1.createCreep(miner, null, {role: "miner"});
        }
        
	    // Check every frame if we should increase the number of harvesters
	    var currCarriers = getNumberCreepsWithRole("carrier");
	    if(currCarriers < config.total_carriers){
	        // Change to creep factory method
	        var carrier = [MOVE, MOVE, MOVE, MOVE, CARRY];
          Game.spawns.Spawn1.createCreep(carrier, null, {role: "carrier"});
        }
        
	    // Check every frame if we should increase the number of harvesters
	    var currBuilders = getNumberCreepsWithRole("builder");
	    if(currBuilders < config.total_builders){
	        // Change to creep factory method
	        var builder = [MOVE, CARRY, WORK];
          Game.spawns.Spawn1.createCreep(builder, null, {role: "builder"});
        }
        
        
        
        
        
	   // Update creeps
    for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      if(creep.memory.role == 'harvester') {
        roleHarvester.update(creep);
      }
      
      if(creep.memory.role == 'miner') {
        roleMiner.update(creep);
      }
      
      if(creep.memory.role == 'carrier') {
        roleCarrier.update(creep);
      }
      
      if(creep.memory.role == 'builder') {
        roleBuilder.update(creep);
      }
      
      
    }
    

  }
  
};

module.exports = creepsManager;