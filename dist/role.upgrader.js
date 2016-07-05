 var roleUpgrader = {

   update: function(creep) {

      // Creep is going to carry resources
      if(creep.carry.energy == 0) {
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
      }else{
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

    }
  }
  module.exports = roleUpgrader;