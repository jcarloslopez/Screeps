/*
* Module code goes here. Use 'module.exports' to export things:
* module.exports.thing = 'a thing';
*
* You can import it from another modules like this:
* var mod = require('role.builder');
* mod.thing == 'a thing'; // true
*/

var roleBuilder = {

 update: function(creep) {

      //creep.say("Builder");
      
      if(creep.carry.energy < creep.carryCapacity) {
        creep.memory.working = false;
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);

      }else{
        creep.memory.working = true;
      }
      
      // Build
      if(creep.memory.working){
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target){
          creep.moveTo(target);
          creep.build(target);
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