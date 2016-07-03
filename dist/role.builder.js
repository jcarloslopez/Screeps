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
      
      if(creep.carry.energy == 0) {
        creep.memory.working = false;

        if(!creep.memory.destinationFound){

          var wharehouses = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN); /*&& structure.energy < structure.energyCapacity*/
            }
          });

          if(wharehouses.length > 0){
            creep.memory.destinationFound = true;
            creep.memory.source = wharehouses[0];
          }

        }else{
          //var source = Game.getObjectById(creep.memory.source.id);
          if(Game.getObjectById(creep.memory.source.id).transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.memory.source.id);
          }else{
            creep.memory.working = true;
          }

        }
      }else if(creep.carry.energy >= creep.carryCapacity){
        creep.memory.working = true;
      }
      
      // Build
      if(creep.memory.working){

        if(creep.memory.destinationFound === false){
          creep.memory.target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
          
          if(creep.memory.target){
            creep.memory.destinationFound = true;  
          }
        }else{
          if(!creep.memory.target){
            creep.memory.destinationFound = false;
            return;
          }
          if(creep.build(Game.getObjectById(creep.memory.target.id)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.memory.target.id);
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