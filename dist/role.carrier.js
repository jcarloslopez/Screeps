/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.carrier');
 * mod.thing == 'a thing'; // true
 */

 var roleCarrier = {
   
   update: function(creep) {
     
        if(creep.carry.energy != creep.carryCapacity) {
          var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
          
          
          if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          }
        }else{
          var wharehouses = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
              structure.energy < structure.energyCapacity;
            }
          });
          
        if(wharehouses.length > 0) {
          if(creep.transfer(wharehouses[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(wharehouses[0]);
          }
        }else{
          // No constructions of that type: STRUCTURE_EXTENSION, STRUCTURE_SPAWN
          // Now check STRUCTURE_STORAGE and STRUCTURE_CONTAINER
          var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_CONTAINER);
            } 
          });

          if(containers.length > 0){
            if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
              creep.moveTo(containers[0]);
            }
          }

        }
      }
      
      
    }
    
  }
  
  module.exports = roleCarrier;