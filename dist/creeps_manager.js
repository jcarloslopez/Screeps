var config = require('config');

// Creeps
var roleHarvester = require('role.harvester');
var roleMiner = require('role.miner');
var roleCarrier = require('role.carrier');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleFixer = require('role.fixer');

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

    // Check every frame if we should increase the number of each unit
    // Change to creep factory method
    var currMiners = getNumberCreepsWithRole("miner");
    if(currMiners < config.total_miners){
        var miner = [MOVE, CARRY, WORK, WORK];
        Game.spawns.Spawn1.createCreep(miner, null, {role: "miner"});
      }
      
    var currCarriers = getNumberCreepsWithRole("carrier");
    if(currCarriers < config.total_carriers){
        // Don't generate carriers if miners are less than needed
        if(currMiners >= config.total_miners){
          var carrier = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY];
          Game.spawns.Spawn1.createCreep(carrier, null, {role: "carrier"});
        }
      }
      
    var currBuilders = getNumberCreepsWithRole("builder");
    if(currBuilders < config.total_builders){
      /* Dont generate builders if there are not constructions to build */
      var constructions_availiable = Game.spawns.Spawn1.room.find(Game.CONSTRUCTION_SITES);
      if(constructions_availiable > 0)
        // Don't generate builders if we don't have miners and carriers
        if(currMiners >= config.total_miners && currCarriers >= config.total_carriers){
          var builder = [WORK, WORK, CARRY, CARRY, MOVE];
          Game.spawns.Spawn1.createCreep(builder, null, {role: "builder"});
        }
      }
      
      var currUpgraders = getNumberCreepsWithRole("upgrader");
      if(currUpgraders < config.total_upgraders){
        // Don't generate builders if we don't have miners and carriers
        if(currMiners >= config.total_miners && currCarriers >= config.total_carriers){
          var upgrader = [MOVE, CARRY, CARRY, WORK, WORK];
          Game.spawns.Spawn1.createCreep(upgrader, null, {role: "upgrader"});
        }
      }

      var currFixers = getNumberCreepsWithRole("fixer");
      if(currFixers < config.total_fixers){
        // Don't generate builders if we don't have miners and carriers
        if(currMiners >= config.total_miners && currCarriers >= config.total_carriers){
          var fixer = [MOVE, MOVE, MOVE, MOVE, CARRY, WORK];
          Game.spawns.Spawn1.createCreep(fixer, null, {role: "fixer"});
        }
      }

      
     // Update creeps
     for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      /*
      if(creep.memory.role == 'harvester') {
        roleHarvester.update(creep);
      }
      */
      if(creep.memory.role == 'miner') {
        roleMiner.update(creep);
      }
      
      if(creep.memory.role == 'carrier') {
        roleCarrier.update(creep);
      }
      
      if(creep.memory.role == 'builder') {
        roleBuilder.update(creep);
      }

      if(creep.memory.role == 'upgrader') {
        roleUpgrader.update(creep);
      }

      if(creep.memory.role == 'fixer') {
        roleFixer.update(creep);
      }

      
      
    }
    

  }
  
};

module.exports = creepsManager;