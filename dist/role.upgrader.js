 var roleUpgrader = {

   update: function(creep) {

      // Creep is going to carry resources
      if(creep.carry.energy == 0) {
        if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE){
          creep.moveTo(Game.spawns.Spawn1);
        }
      }else{
        if(creep.room.controller) {
          if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
          }
        }

      }

    }
  }
  module.exports = roleUpgrader;