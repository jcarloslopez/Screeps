/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('role.builder');
* mod.thing == 'a thing'; // true
*/

var total_energy = 0;
var total_energy_capacity = 0;

var roleBuilder = {

 update: function(creep) {

  if(creep.carry.energy == 0) {
    creep.memory.working = false;

    // Check if energy is greater than a third of max energy,
    // If is not, dont take energy from structures
    total_energy = total_energy_capacity = 0;
    var wharehouses = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == StructureContainer);
      }
    });

    // Accum current energy and total 
    for (i = 0; i < wharehouses.length; ++i) {
      total_energy += wharehouses[i].energy;
      total_energy_capacity += wharehouses[i].energyCapacity;
    }
    
    //console.log(total_energy + "/" + total_energy_capacity)
    if(total_energy >= (total_energy_capacity / 1.5)){
        //console.log(total_energy + "/" + (total_energy_capacity / 1.5))
        if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE){
          creep.moveTo(Game.spawns.Spawn1);    
        }
      }

  }else{
    creep.memory.working = true;
  }

  // Build
  if(creep.memory.working){
    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    if(target){
      if(creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }


      // Pass to repairer
      /*{   // Repair
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
      }*/
      
      //pass to upgrader
      // If nothing to do, upgrade controller
      /*
      if(creep.room.controller) {
        creep.moveTo(creep.room.controller);
        creep.upgradeController(creep.room.controller);

      }*/
    }



  }

  module.exports = roleBuilder;