/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

/* ROLE MINER 
 *
 * @brief Role of miner creep
 *
 * This role can only move to the resource location, and then works. 
 * Never stops working.
 * It need a CARRIER to take the resources
 */ 
 
 
 var roleMiner = {
   
   update: function(creep) {
     
         //creep.say("Miner");
         
      // Creep is going to carry resources
      if(creep.carry.energy < 50 /*creep.carryCapacity*/) { // 50 units is what can carry the carrier
        var sources = creep.room.find(FIND_SOURCES);
            // If is not near, walk to resources
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0]);
            }
          }else{
            creep.drop(RESOURCE_ENERGY);
          }
          
        }
        
      }
      
      module.exports = roleMiner;