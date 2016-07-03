/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('role.builder');
* mod.thing == 'a thing'; // true
*/

var smBuilder = {
  kIdle: 0,
  kFindingJob: 1,
  kTakingEnergy: 2,
  kBuilding: 3,
  kRepairing: 4,
  kUpgradingController: 5
}

var sm = smBuilder.kTakingEnergy;
var foundDestination = false;
var target;

var pathToDestination; // Use this when upgrading to pathfinder


function updateMemorySM(creep){
  creep.memory.sm = sm;
}


function findingJob(creep){
  // Setup a job priority here
  target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
  if(creep.name == "Andrew"){
    console.log(target)
  }
  if(target){
    foundDestination = true;
    sm = smBuilder.kBuilding;
    updateMemorySM(creep);
  }
}

function takeEnergy(creep){
  var wharehouses = [];

  if(!foundDestination){
    wharehouses = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN); /*&& structure.energy < structure.energyCapacity*/
      }
    });

    if(wharehouses.length > 0){
      foundDestination = true;
    }
  }

  if(wharehouses.length > 0) {
    // Move to wharehouse and transfer its energy
    if(wharehouses[0].transferEnergy(creep) == ERR_NOT_IN_RANGE) {
      creep.moveTo(wharehouses[0]);
    }

    // Check full energy
    if(creep.carry.energy >= creep.carryCapacity){
      sm = smBuilder.kFindingJob;
      foundDestination = false;
      updateMemorySM(creep);
    }

  }
}

function build(creep){
  
  if(!foundDestination){
    target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    foundDestination = true;
  }

  // Move to destination if found
  if(target){
    if(creep.build(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }else{
      foundDestination = false;
      sm = smBuilder.kFindingJob;
      updateMemorySM(creep);
    }
  }

}

var roleBuilder = {

  update: function(creep) {

    //creep.say("Builder");

    if(creep.carry.energy == 0) {
      sm = smBuilder.kTakingEnergy;
      updateMemorySM(creep);
    }
    
    switch(sm){
      case smBuilder.kIdle:
      break;
      case smBuilder.kFindingJob:
        findingJob(creep);
      break;
      case smBuilder.kTakingEnergy:
        takeEnergy(creep);
      break;
      case smBuilder.kBuilding:
        build(creep);
      default:
      break;
    }

    /*
    {   // Build
      var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
      if(target) {
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
          return;
        }
      }
    }
    
    {   // Repair
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(object){
                //if(object.structureType != STRUCTURE_ROAD ) {
                //   return false;
                //}
                if(object.hits > object.hitsMax / 3) {
                  return false;
                }
                return true;
              } 
            });

      if(target){
        if(creep.repair(target) == ERR_NOT_IN_RANGE){
          creep.moveTo(target);
          return;
        }
      }
    }
    
    // If nothing to do, upgrade controller
    if(creep.room.controller) {
      creep.moveTo(creep.room.controller);
      creep.upgradeController(creep.room.controller);

    }
    */

  }

}

module.exports = roleBuilder;