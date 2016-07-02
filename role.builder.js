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
            
            var wharehouses = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN); /*&& structure.energy < structure.energyCapacity*/
                }
            });
            
            if(wharehouses.length > 0) {
                if(wharehouses[0].transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(wharehouses[0]);
                }
            }
        }else{ // Builder has energy
        
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
        }
        
    }
    
 }
 
 module.exports = roleBuilder;